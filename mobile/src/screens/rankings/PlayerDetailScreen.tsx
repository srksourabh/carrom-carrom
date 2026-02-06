import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Avatar } from '../../components/common/Avatar';
import { StatCard } from '../../components/profile/StatCard';
import { RecentMatchesList } from '../../components/profile/RecentMatchesList';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorDisplay } from '../../components/common/ErrorDisplay';
import { useUserProfile } from '../../hooks/useUser';
import { useMatches } from '../../hooks/useMatches';
import { useAuthStore } from '../../stores/authStore';
import { formatWinRate } from '../../utils/formatting';
import { colors } from '../../theme';

interface Props {
  route: any;
  navigation: any;
}

export function PlayerDetailScreen({ route, navigation }: Props) {
  const { userId } = route.params;
  const currentUser = useAuthStore((s) => s.user);
  const { data: player, isLoading, error, refetch } = useUserProfile(userId);
  const { data: matchData } = useMatches(1, userId);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message="Failed to load player" onRetry={refetch} />;
  if (!player) return <ErrorDisplay message="Player not found" />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar uri={player.avatarUrl} name={player.name} size={80} />
        <Text style={styles.name}>{player.displayName || player.name}</Text>
        <Text style={styles.location}>
          {player.district || 'West Bengal'} | {player.club?.name || 'Independent'}
        </Text>
        {player.bio && <Text style={styles.bio}>{player.bio}</Text>}
      </View>

      <View style={styles.statsRow}>
        <StatCard label="ELO" value={player.eloRating} color={colors.primary} />
        <StatCard label="Matches" value={player.totalMatches} />
        <StatCard
          label="Win Rate"
          value={formatWinRate(player.wins, player.totalMatches)}
          color={colors.success}
        />
      </View>

      <View style={styles.statsRow}>
        <StatCard label="Wins" value={player.wins} color={colors.success} />
        <StatCard label="Losses" value={player.losses} color={colors.error} />
        <StatCard label="Draws" value={player.draws} color={colors.warning} />
      </View>

      {currentUser?.id !== userId && (
        <View style={styles.actions}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('MatchTab', {
              screen: 'RecordMatch',
              params: { opponentId: userId, opponentName: player.name },
            })}
            buttonColor={colors.secondary}
            style={styles.actionButton}
          >
            Challenge
          </Button>
        </View>
      )}

      <RecentMatchesList
        matches={matchData?.matches || []}
        currentUserId={userId}
      />

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.surface,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginTop: 12,
  },
  location: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  bio: {
    fontSize: 14,
    color: colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginTop: 12,
  },
  actions: {
    padding: 16,
  },
  actionButton: {
    borderRadius: 8,
  },
  bottomSpacer: {
    height: 24,
  },
});
