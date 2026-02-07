import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { useMyProfile } from '../../hooks/useUser';
import { useMatches } from '../../hooks/useMatches';
import { useMyRank } from '../../hooks/useRankings';
import { StatCard } from '../../components/profile/StatCard';
import { RecentMatchesList } from '../../components/profile/RecentMatchesList';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useAuthStore } from '../../stores/authStore';
import { formatWinRate } from '../../utils/formatting';
import { colors } from '../../theme';

interface Props {
  navigation: any;
}

export function HomeScreen({ navigation }: Props) {
  const user = useAuthStore((s) => s.user);
  const { data: profile, isLoading: profileLoading, refetch: refetchProfile } = useMyProfile();
  const { data: matchData, refetch: refetchMatches } = useMatches();
  const { data: rankData, refetch: refetchRank } = useMyRank();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchProfile(), refetchMatches(), refetchRank()]);
    setRefreshing(false);
  };

  if (profileLoading) return <LoadingSpinner message="Loading..." />;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hello, {profile?.displayName || profile?.name || user?.name || 'Player'}!
        </Text>
        <Text style={styles.subGreeting}>Ready for a match?</Text>
      </View>

      <View style={styles.statsRow}>
        <StatCard label="ELO Rating" value={profile?.eloRating || 1200} color={colors.primary} />
        <StatCard label="Rank" value={rankData ? `#${rankData.rank}` : '-'} color={colors.secondary} />
        <StatCard
          label="Win Rate"
          value={formatWinRate(profile?.wins || 0, profile?.totalMatches || 0)}
          color={colors.success}
        />
      </View>

      <View style={styles.statsRow}>
        <StatCard label="Matches" value={profile?.totalMatches || 0} />
        <StatCard label="Wins" value={profile?.wins || 0} color={colors.success} />
        <StatCard label="Streak" value={`${profile?.winStreak || 0}W`} color={colors.secondary} />
      </View>

      <Card style={styles.ctaCard}>
        <Card.Content style={styles.ctaContent}>
          <Text style={styles.ctaText}>Record your latest match</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('MatchTab', { screen: 'RecordMatch' })}
            buttonColor={colors.secondary}
          >
            Record Match
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.ctaCard}>
        <Card.Content style={styles.ctaContent}>
          <Text style={styles.ctaText}>Explore carrom clubs near you</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('ClubsList')}
            buttonColor={colors.primary}
          >
            Browse Clubs
          </Button>
        </Card.Content>
      </Card>

      <RecentMatchesList
        matches={matchData?.matches || []}
        currentUserId={profile?.id || user?.id || ''}
        onMatchPress={(id) => navigation.navigate('MatchTab', { screen: 'MatchDetail', params: { matchId: id } })}
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
    padding: 20,
    paddingTop: 16,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textOnPrimary,
  },
  subGreeting: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginTop: 12,
  },
  ctaCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: colors.surface,
  },
  ctaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  bottomSpacer: {
    height: 24,
  },
});
