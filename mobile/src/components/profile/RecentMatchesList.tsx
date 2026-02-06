import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MatchCard } from '../match/MatchCard';
import { EmptyState } from '../common/EmptyState';
import { colors } from '../../theme';

interface Props {
  matches: any[];
  currentUserId: string;
  onMatchPress?: (matchId: string) => void;
}

export function RecentMatchesList({ matches, currentUserId, onMatchPress }: Props) {
  if (!matches || matches.length === 0) {
    return <EmptyState title="No matches yet" subtitle="Record your first match!" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent Matches</Text>
      {matches.slice(0, 5).map((match) => (
        <MatchCard
          key={match.id}
          match={match}
          currentUserId={currentUserId}
          onPress={() => onMatchPress?.(match.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
});
