import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Avatar } from '../common/Avatar';
import { colors } from '../../theme';

interface Props {
  player: any;
  onPress?: () => void;
}

function getRankColor(rank: number) {
  if (rank === 1) return colors.gold;
  if (rank === 2) return colors.silver;
  if (rank === 3) return colors.bronze;
  return colors.textSecondary;
}

export function RankingRow({ player, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.rankBadge, { backgroundColor: getRankColor(player.rank) }]}>
        <Text style={styles.rankText}>{player.rank}</Text>
      </View>
      <Avatar uri={player.avatarUrl} name={player.name} size={40} />
      <View style={styles.info}>
        <Text style={styles.name}>{player.displayName || player.name}</Text>
        <Text style={styles.meta}>
          {player.club?.name || player.district || 'West Bengal'}
        </Text>
      </View>
      <View style={styles.stats}>
        <Text style={styles.elo}>{player.eloRating}</Text>
        <Text style={styles.record}>
          {player.wins}W {player.losses}L
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  meta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  stats: {
    alignItems: 'flex-end',
  },
  elo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  record: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
