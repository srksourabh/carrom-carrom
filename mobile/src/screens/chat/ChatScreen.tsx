import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, IconButton } from 'react-native-paper';
import { useMessages, useSendMessage } from '../../hooks/useChat';
import { useAuthStore } from '../../stores/authStore';
import { Avatar } from '../../components/common/Avatar';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { formatRelativeTime } from '../../utils/formatting';
import { colors } from '../../theme';

interface Props {
  navigation: any;
  route: any;
}

export function ChatScreen({ navigation, route }: Props) {
  const { conversationId, otherUserName } = route.params;
  const user = useAuthStore((s) => s.user);
  const { data, isLoading, refetch } = useMessages(conversationId);
  const sendMessage = useSendMessage();
  const [text, setText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (otherUserName) {
      navigation.setOptions({ title: otherUserName });
    }
  }, [otherUserName, navigation]);

  const handleSend = async () => {
    if (!text.trim()) return;
    const content = text.trim();
    setText('');
    try {
      await sendMessage.mutateAsync({ conversationId, content });
    } catch {}
  };

  if (isLoading) return <LoadingSpinner message="Loading messages..." />;

  const messages = data?.messages || [];

  const renderMessage = ({ item }: { item: any }) => {
    const isMe = item.sender.id === user?.id;
    return (
      <View style={[styles.messageRow, isMe ? styles.messageRowRight : styles.messageRowLeft]}>
        {!isMe && (
          <Avatar uri={item.sender.avatarUrl} name={item.sender.displayName || item.sender.name} size={28} />
        )}
        <View style={[styles.messageBubble, isMe ? styles.bubbleRight : styles.bubbleLeft]}>
          <Text style={[styles.messageText, isMe && styles.messageTextRight]}>{item.content}</Text>
          <Text style={[styles.messageTime, isMe && styles.messageTimeRight]}>
            {formatRelativeTime(item.createdAt)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
        ListEmptyComponent={
          <View style={styles.emptyChat}>
            <Text style={styles.emptyChatText}>Start the conversation!</Text>
          </View>
        }
      />

      <View style={styles.inputBar}>
        <TextInput
          mode="outlined"
          placeholder="Type a message..."
          value={text}
          onChangeText={setText}
          style={styles.textInput}
          maxLength={2000}
          dense
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <IconButton
          icon="send"
          mode="contained"
          containerColor={colors.primary}
          iconColor={colors.textOnPrimary}
          onPress={handleSend}
          disabled={!text.trim()}
          size={22}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messagesList: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexGrow: 1,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-end',
  },
  messageRowLeft: {
    justifyContent: 'flex-start',
  },
  messageRowRight: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 16,
    marginHorizontal: 6,
  },
  bubbleLeft: {
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 4,
    elevation: 1,
  },
  bubbleRight: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 20,
  },
  messageTextRight: {
    color: colors.textOnPrimary,
  },
  messageTime: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  messageTimeRight: {
    color: 'rgba(255,255,255,0.7)',
  },
  emptyChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyChatText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.surface,
    marginRight: 4,
  },
});
