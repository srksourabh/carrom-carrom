import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';
import { Avatar } from '../../components/common/Avatar';
import { StatCard } from '../../components/profile/StatCard';
import { RecentMatchesList } from '../../components/profile/RecentMatchesList';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useMyProfile } from '../../hooks/useUser';
import { useMatches } from '../../hooks/useMatches';
import { useMyRank } from '../../hooks/useRankings';
import { useAuthStore } from '../../stores/authStore';
import { formatWinRate } from '../../utils/formatting';
import { colors } from '../../theme';

interface Props {
  navigation: any;
}

export function ProfileScreen({ navigation }: Props) {
  const logout = useAuthStore((s) => s.logout);
  const { data: profile, isLoading, refetch: refetchProfile } = useMyProfile();
  const { data: matchData, refetch: refetchMatches } = useMatches();
  const { data: rankData, refetch: refetchRank } = useMyRank();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchProfile(), refetchMatches(), refetchRank()]);
    setRefreshing(false);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Avatar uri={profile?.avatarUrl} name={profile?.name || 'User'} size={80} />
        <Text style={styles.name}>{profile?.displayName || profile?.name}</Text>
        <Text style={styles.location}>
          {profile?.district || 'West Bengal'} | {profile?.club?.name || 'Independent'}
        </Text>
        {profile?.bio && <Text style={styles.bio}>{profile.bio}</Text>}
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.editButton}
        >
          Edit Profile
        </Button>
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
        <StatCard label="Losses" value={profile?.losses || 0} color={colors.error} />
        <StatCard label="Draws" value={profile?.draws || 0} color={colors.warning} />
      </View>

      <Divider style={styles.divider} />

      <RecentMatchesList
        matches={matchData?.matches || []}
        currentUserId={profile?.id || ''}
        onMatchPress={(id) => navigation.navigate('MatchTab', { screen: 'MatchDetail', params: { matchId: id } })}
      />

      <View style={styles.section}>
        <Button
          mode="text"
          onPress={logout}
          textColor={colors.error}
          style={styles.logoutButton}
        >
          Logout
        </Button>
      </View>

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
  editButton: {
    marginTop: 12,
    borderRadius: 8,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginTop: 12,
  },
  divider: {
    marginTop: 16,
  },
  section: {
    padding: 16,
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 8,
  },
  bottomSpacer: {
    height: 24,
  },
});
