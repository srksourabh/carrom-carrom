import { Request, Response, NextFunction } from 'express';
import * as chatService from '../services/chat.service';
import { success } from '../utils/apiResponse';

export async function startConversation(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await chatService.startConversation(
      req.user!.userId,
      req.body.participantId,
      req.body.message
    );
    success(res, result, 'Conversation started', 201);
  } catch (err) {
    next(err);
  }
}

export async function getConversations(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = req.query as any;
    const result = await chatService.getConversations(
      req.user!.userId,
      parseInt(page) || 1,
      parseInt(limit) || 20
    );
    success(res, result);
  } catch (err) {
    next(err);
  }
}

export async function getMessages(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = req.query as any;
    const result = await chatService.getMessages(
      String(req.params.id),
      req.user!.userId,
      parseInt(page) || 1,
      parseInt(limit) || 50
    );
    success(res, result);
  } catch (err) {
    next(err);
  }
}

export async function sendMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const message = await chatService.sendMessage(
      String(req.params.id),
      req.user!.userId,
      req.body.content
    );
    success(res, message, 'Message sent', 201);
  } catch (err) {
    next(err);
  }
}

export async function getOrCreateConversation(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await chatService.getOrCreateConversation(
      req.user!.userId,
      String(req.params.userId)
    );
    success(res, result);
  } catch (err) {
    next(err);
  }
}

export async function getUnreadCount(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await chatService.getUnreadCount(req.user!.userId);
    success(res, result);
  } catch (err) {
    next(err);
  }
}
