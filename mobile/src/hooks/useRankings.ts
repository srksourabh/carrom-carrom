import { useQuery } from '@tanstack/react-query';
import * as rankingApi from '../services/ranking.api';

export function useRankings(page = 1, district?: string) {
  return useQuery({
    queryKey: ['rankings', page, district],
    queryFn: () => rankingApi.getRankings(page, 50, district),
  });
}

export function useSearchRankings(query: string) {
  return useQuery({
    queryKey: ['searchRankings', query],
    queryFn: () => rankingApi.searchRankings(query),
    enabled: query.length >= 2,
  });
}

export function useMyRank() {
  return useQuery({
    queryKey: ['myRank'],
    queryFn: rankingApi.getMyRank,
  });
}
