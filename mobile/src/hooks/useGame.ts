import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as gameApi from '../services/game.api';

export function useOpenGames(page = 1) {
  return useQuery({
    queryKey: ['openGames', page],
    queryFn: () => gameApi.getOpenGames(page),
    refetchInterval: 10000,
  });
}

export function useMyGames(page = 1, status?: string) {
  return useQuery({
    queryKey: ['myGames', page, status],
    queryFn: () => gameApi.getMyGames(page, 20, status),
  });
}

export function useGame(id: string) {
  return useQuery({
    queryKey: ['game', id],
    queryFn: () => gameApi.getGame(id),
    enabled: !!id,
    refetchInterval: 3000, // Poll for opponent's moves
  });
}

export function useGameMoves(id: string) {
  return useQuery({
    queryKey: ['gameMoves', id],
    queryFn: () => gameApi.getGameMoves(id),
    enabled: !!id,
  });
}

export function useCreateGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (targetScore?: number) => gameApi.createGame(targetScore),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myGames'] });
    },
  });
}

export function useJoinGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: gameApi.joinGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['openGames'] });
      queryClient.invalidateQueries({ queryKey: ['myGames'] });
    },
  });
}

export function useMakeMove() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ gameId, move }: { gameId: string; move: { strikerX: number; angle: number; power: number } }) =>
      gameApi.makeMove(gameId, move),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['game', variables.gameId] });
      queryClient.invalidateQueries({ queryKey: ['gameMoves', variables.gameId] });
    },
  });
}

export function useAbandonGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: gameApi.abandonGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myGames'] });
    },
  });
}
