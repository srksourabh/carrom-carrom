import { prisma } from '../config/database';
import { AppError } from '../middleware/errorHandler';

function getConversationKey(id1: string, id2: string): [string, string] {
  return id1 < id2 ? [id1, id2] : [id2, id1];
}

export async function startConversation(userId: string, participantId: string, messageContent: string) {
  if (userId === participantId) throw new AppError(400, 'Cannot message yourself');

  const participant = await prisma.user.findUnique({ where: { id: participantId } });
  if (!participant) throw new AppError(404, 'User not found');

  const [p1, p2] = getConversationKey(userId, participantId);

  // Find or create conversation
  let conversation = await prisma.conversation.findUnique({
    where: { participant1_participant2: { participant1: p1, participant2: p2 } },
  });

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: { participant1: p1, participant2: p2 },
    });
  }

  // Send the first message
  const message = await prisma.message.create({
    data: {
      conversationId: conversation.id,
      senderId: userId,
      content: messageContent,
    },
    include: {
      sender: { select: { id: true, name: true, displayName: true, avatarUrl: true } },
    },
  });

  // Update conversation's last message
  await prisma.conversation.update({
    where: { id: conversation.id },
    data: {
      lastMessage: messageContent.substring(0, 100),
      lastMessageAt: new Date(),
    },
  });

  return { conversation, message };
}

export async function getConversations(userId: string, page: number, limit: number) {
  const where = {
    OR: [
      { participant1: userId },
      { participant2: userId },
    ],
  };

  const [conversations, total] = await Promise.all([
    prisma.conversation.findMany({
      where,
      orderBy: { lastMessageAt: { sort: 'desc', nulls: 'last' } },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user1: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true } },
        user2: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true } },
        messages: {
          where: { isRead: false, NOT: { senderId: userId } },
          select: { id: true },
        },
      },
    }),
    prisma.conversation.count({ where }),
  ]);

  // Transform to add unread count and other participant
  const transformed = conversations.map((conv) => {
    const otherUser = conv.participant1 === userId ? conv.user2 : conv.user1;
    return {
      id: conv.id,
      otherUser,
      lastMessage: conv.lastMessage,
      lastMessageAt: conv.lastMessageAt,
      unreadCount: conv.messages.length,
      createdAt: conv.createdAt,
    };
  });

  return { conversations: transformed, total, page, limit };
}

export async function getMessages(conversationId: string, userId: string, page: number, limit: number) {
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
  });

  if (!conversation) throw new AppError(404, 'Conversation not found');
  if (conversation.participant1 !== userId && conversation.participant2 !== userId) {
    throw new AppError(403, 'Not a participant in this conversation');
  }

  const [messages, total] = await Promise.all([
    prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        sender: { select: { id: true, name: true, displayName: true, avatarUrl: true } },
      },
    }),
    prisma.message.count({ where: { conversationId } }),
  ]);

  // Mark unread messages as read
  await prisma.message.updateMany({
    where: {
      conversationId,
      isRead: false,
      NOT: { senderId: userId },
    },
    data: { isRead: true },
  });

  return { messages: messages.reverse(), total, page, limit };
}

export async function sendMessage(conversationId: string, userId: string, content: string) {
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
  });

  if (!conversation) throw new AppError(404, 'Conversation not found');
  if (conversation.participant1 !== userId && conversation.participant2 !== userId) {
    throw new AppError(403, 'Not a participant in this conversation');
  }

  const message = await prisma.message.create({
    data: {
      conversationId,
      senderId: userId,
      content,
    },
    include: {
      sender: { select: { id: true, name: true, displayName: true, avatarUrl: true } },
    },
  });

  await prisma.conversation.update({
    where: { id: conversationId },
    data: {
      lastMessage: content.substring(0, 100),
      lastMessageAt: new Date(),
    },
  });

  return message;
}

export async function getOrCreateConversation(userId: string, participantId: string) {
  if (userId === participantId) throw new AppError(400, 'Cannot message yourself');

  const [p1, p2] = getConversationKey(userId, participantId);

  let conversation = await prisma.conversation.findUnique({
    where: { participant1_participant2: { participant1: p1, participant2: p2 } },
    include: {
      user1: { select: { id: true, name: true, displayName: true, avatarUrl: true } },
      user2: { select: { id: true, name: true, displayName: true, avatarUrl: true } },
    },
  });

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: { participant1: p1, participant2: p2 },
      include: {
        user1: { select: { id: true, name: true, displayName: true, avatarUrl: true } },
        user2: { select: { id: true, name: true, displayName: true, avatarUrl: true } },
      },
    });
  }

  const otherUser = p1 === userId ? conversation.user2 : conversation.user1;
  return { id: conversation.id, otherUser };
}

export async function getUnreadCount(userId: string) {
  const count = await prisma.message.count({
    where: {
      isRead: false,
      NOT: { senderId: userId },
      conversation: {
        OR: [
          { participant1: userId },
          { participant2: userId },
        ],
      },
    },
  });
  return { unreadCount: count };
}
