import { Prisma } from '@prisma/client';
import { prisma } from '../config/database';
import { AppError } from '../middleware/errorHandler';
import {
  createInitialBoard,
  simulateStrike,
  calculateScore,
  BOARD_SIZE,
  Piece,
} from '../utils/carromPhysics';

const PLAYER_SELECT = { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true };

export async function createGame(userId: string, targetScore: number = 25) {
  const board = createInitialBoard();

  const game = await prisma.gameRoom.create({
    data: {
      player1Id: userId,
      status: 'WAITING',
      targetScore,
      gameState: {
        pieces: board as unknown as Prisma.InputJsonValue[],
        player1Color: 'white',
        player2Color: 'black',
      } as unknown as Prisma.InputJsonValue,
    },
    include: {
      player1: { select: PLAYER_SELECT },
      player2: { select: PLAYER_SELECT },
    },
  });

  return game;
}

export async function getOpenGames(userId: string, page: number, limit: number) {
  const [games, total] = await Promise.all([
    prisma.gameRoom.findMany({
      where: {
        status: 'WAITING',
        player1Id: { not: userId },
        player2Id: null,
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        player1: { select: PLAYER_SELECT },
      },
    }),
    prisma.gameRoom.count({
      where: { status: 'WAITING', player1Id: { not: userId }, player2Id: null },
    }),
  ]);

  return { games, total, page, limit };
}

export async function getMyGames(userId: string, page: number, limit: number, status?: string) {
  const statusFilter = status ? { status: status as any } : {};
  const where = {
    OR: [{ player1Id: userId }, { player2Id: userId }],
    ...statusFilter,
  };

  const [games, total] = await Promise.all([
    prisma.gameRoom.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        player1: { select: PLAYER_SELECT },
        player2: { select: PLAYER_SELECT },
      },
    }),
    prisma.gameRoom.count({ where }),
  ]);

  return { games, total, page, limit };
}

export async function joinGame(gameId: string, userId: string) {
  const game = await prisma.gameRoom.findUnique({ where: { id: gameId } });
  if (!game) throw new AppError(404, 'Game not found');
  if (game.status !== 'WAITING') throw new AppError(400, 'Game is not available to join');
  if (game.player1Id === userId) throw new AppError(400, 'Cannot join your own game');
  if (game.player2Id) throw new AppError(400, 'Game is full');

  return prisma.gameRoom.update({
    where: { id: gameId },
    data: {
      player2Id: userId,
      status: 'IN_PROGRESS',
      currentTurn: game.player1Id, // Player 1 goes first
    },
    include: {
      player1: { select: PLAYER_SELECT },
      player2: { select: PLAYER_SELECT },
    },
  });
}

export async function getGame(gameId: string, userId: string) {
  const game = await prisma.gameRoom.findUnique({
    where: { id: gameId },
    include: {
      player1: { select: PLAYER_SELECT },
      player2: { select: PLAYER_SELECT },
      winner: { select: PLAYER_SELECT },
    },
  });

  if (!game) throw new AppError(404, 'Game not found');
  if (game.player1Id !== userId && game.player2Id !== userId) {
    throw new AppError(403, 'Not a participant in this game');
  }

  return game;
}

export async function makeMove(
  gameId: string,
  userId: string,
  strikerX: number,
  angle: number,
  power: number
) {
  const game = await prisma.gameRoom.findUnique({
    where: { id: gameId },
    include: {
      player1: { select: PLAYER_SELECT },
      player2: { select: PLAYER_SELECT },
    },
  });

  if (!game) throw new AppError(404, 'Game not found');
  if (game.status !== 'IN_PROGRESS') throw new AppError(400, 'Game is not in progress');
  if (game.currentTurn !== userId) throw new AppError(400, 'Not your turn');

  const state = game.gameState as any;
  const pieces: Piece[] = state.pieces;
  const isPlayer1 = game.player1Id === userId;
  const playerColor = isPlayer1 ? state.player1Color : state.player2Color;
  const opponentColor = isPlayer1 ? state.player2Color : state.player1Color;

  // Striker starts from player's baseline
  const strikerY = isPlayer1 ? BOARD_SIZE - 70 : 70;

  // Run physics simulation
  const result = simulateStrike(pieces, strikerX, strikerY, angle, power);

  // Calculate scores
  const scoreResult = calculateScore(result.pocketed, playerColor, result.strikerPocketed);

  // Calculate opponent points (from their coins we pocketed)
  let opponentPoints = 0;
  for (const coin of result.pocketed) {
    if (coin.type === opponentColor) {
      opponentPoints += 1;
    }
  }

  // If foul (striker pocketed), return one of our pocketed coins to center
  if (result.strikerPocketed) {
    const returnCoin = result.pieces.find(
      (p) => p.pocketed && p.type === playerColor
    );
    if (returnCoin) {
      returnCoin.pocketed = false;
      returnCoin.x = BOARD_SIZE / 2 + (Math.random() - 0.5) * 20;
      returnCoin.y = BOARD_SIZE / 2 + (Math.random() - 0.5) * 20;
      returnCoin.vx = 0;
      returnCoin.vy = 0;
    }
  }

  const newP1Score = game.player1Score + (isPlayer1 ? scoreResult.points : opponentPoints);
  const newP2Score = game.player2Score + (isPlayer1 ? opponentPoints : scoreResult.points);

  // Check if all coins of a type are pocketed
  const remainingWhite = result.pieces.filter((p) => p.type === 'white' && !p.pocketed).length;
  const remainingBlack = result.pieces.filter((p) => p.type === 'black' && !p.pocketed).length;
  const remainingQueen = result.pieces.filter((p) => p.type === 'queen' && !p.pocketed).length;
  const allCoinsPocketed = remainingWhite === 0 && remainingBlack === 0 && remainingQueen === 0;

  // Determine next turn
  let nextTurn = scoreResult.continueTurn ? userId : (isPlayer1 ? game.player2Id : game.player1Id);

  // Check win condition
  let winnerId: string | null = null;
  let newStatus: string = game.status;

  if (allCoinsPocketed || newP1Score >= game.targetScore || newP2Score >= game.targetScore) {
    newStatus = 'COMPLETED';
    if (newP1Score > newP2Score) {
      winnerId = game.player1Id;
    } else if (newP2Score > newP1Score) {
      winnerId = game.player2Id!;
    } else {
      // Tie: player who pocketed last wins
      winnerId = userId;
    }
    nextTurn = null;
  }

  // Record the move
  await prisma.gameMove.create({
    data: {
      gameRoomId: gameId,
      playerId: userId,
      moveType: result.foul ? 'FOUL' : (result.pocketed.length > 0 ? 'STRIKE' : 'MISS'),
      moveData: {
        strikerX,
        angle,
        power,
        pocketed: result.pocketed.map((p) => ({ id: p.id, type: p.type })),
        strikerPocketed: result.strikerPocketed,
        scoreChange: scoreResult.points,
      },
      round: game.round,
    },
  });

  // Update game state
  const updated = await prisma.gameRoom.update({
    where: { id: gameId },
    data: {
      gameState: { pieces: result.pieces, player1Color: state.player1Color, player2Color: state.player2Color } as unknown as Prisma.InputJsonValue,
      player1Score: newP1Score,
      player2Score: newP2Score,
      currentTurn: nextTurn,
      status: newStatus as any,
      winnerId,
    },
    include: {
      player1: { select: PLAYER_SELECT },
      player2: { select: PLAYER_SELECT },
      winner: { select: PLAYER_SELECT },
    },
  });

  return {
    game: updated,
    moveResult: {
      pocketed: result.pocketed,
      strikerPocketed: result.strikerPocketed,
      foul: result.foul,
      scoreChange: scoreResult.points,
      continueTurn: scoreResult.continueTurn,
    },
  };
}

export async function abandonGame(gameId: string, userId: string) {
  const game = await prisma.gameRoom.findUnique({ where: { id: gameId } });
  if (!game) throw new AppError(404, 'Game not found');
  if (game.player1Id !== userId && game.player2Id !== userId) {
    throw new AppError(403, 'Not a participant');
  }
  if (game.status === 'COMPLETED' || game.status === 'ABANDONED') {
    throw new AppError(400, 'Game already ended');
  }

  // If waiting (no opponent), just cancel
  if (game.status === 'WAITING') {
    return prisma.gameRoom.update({
      where: { id: gameId },
      data: { status: 'ABANDONED' },
    });
  }

  // If in progress, the other player wins
  const winnerId = game.player1Id === userId ? game.player2Id : game.player1Id;
  return prisma.gameRoom.update({
    where: { id: gameId },
    data: { status: 'ABANDONED', winnerId },
    include: {
      player1: { select: PLAYER_SELECT },
      player2: { select: PLAYER_SELECT },
      winner: { select: PLAYER_SELECT },
    },
  });
}

export async function getGameMoves(gameId: string, userId: string) {
  const game = await prisma.gameRoom.findUnique({ where: { id: gameId } });
  if (!game) throw new AppError(404, 'Game not found');
  if (game.player1Id !== userId && game.player2Id !== userId) {
    throw new AppError(403, 'Not a participant');
  }

  return prisma.gameMove.findMany({
    where: { gameRoomId: gameId },
    orderBy: { createdAt: 'asc' },
    include: {
      player: { select: PLAYER_SELECT },
    },
  });
}
