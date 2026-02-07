import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Text, Button, Chip, FAB } from 'react-native-paper';
import { useChallenges } from '../../hooks/useChallenges';
import { useAuthStore } from '../../stores/authStore';
import { Avatar } from '../../components/common/Avatar';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { formatRelativeTime } from '../../utils/formatting';
import { colors } from '../../theme';

interface Props {
  navigation: any;
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: colors.warning,
  ACCEPTED: colors.success,
  DECLINED: colors.error,
  COMPLETED: colors.primary,
  EXPIRED: colors.textSecondary,
};

const FILTER_OPTIONS = [
  { key: 'all', label: 'All' },
  { key: 'received', label: 'Received' },
  { key: 'sent', label: 'Sent' },
];

export function ChallengesListScreen({ navigation }: Props) {
  const [filter, setFilter] = useState('all');
  const user = useAuthStore((s) => s.user);
  const { data, isLoading, refetch } = useChallenges(1, filter);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) return <LoadingSpinner message="Loading challenges..." />;

  const challenges = data?.challenges || [];

  const renderChallenge = ({ item }: { item: any }) => {
    const isSender = item.sender.id === user?.id;
    const opponent = isSender ? item.receiver : item.sender;
    const direction = isSender ? 'Sent to' : 'From';

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ChallengeDetail', { challengeId: item.id })}
      >
        <View style={styles.cardHeader}>
          <Avatar uri={opponent.avatarUrl} name={opponent.displayName || opponent.name} size={44} />
          <View style={styles.cardInfo}>
            <Text style={styles.opponentName}>{opponent.displayName || opponent.name}</Text>
            <Text style={styles.direction}>{direction}</Text>
            <Text style={styles.elo}>ELO: {opponent.eloRating}</Text>
          </View>
          <View style={styles.cardRight}>
            <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[item.status] || colors.textSecondary }]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
            <Text style={styles.time}>{formatRelativeTime(item.createdAt)}</Text>
          </View>
        </View>
        {item.message && (
          <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
        )}
        {item.proposedVenue && (
          <Text style={styles.venue}>Venue: {item.proposedVenue}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        {FILTER_OPTIONS.map((opt) => (
          <Chip
            key={opt.key}
            selected={filter === opt.key}
            onPress={() => setFilter(opt.key)}
            style={[styles.filterChip, filter === opt.key && styles.filterChipActive]}
            textStyle={filter === opt.key ? styles.filterTextActive : styles.filterText}
          >
            {opt.label}
          </Chip>
        ))}
      </View>

      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={renderChallenge}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={challenges.length === 0 ? styles.emptyContainer : styles.list}
        ListEmptyComponent={
          <EmptyState
            title="No challenges yet"
            subtitle="Challenge a player to a match!"
          />
        }
      />

      <FAB
        icon="plus"
        label="Challenge"
        style={styles.fab}
        onPress={() => navigation.navigate('CreateChallenge')}
        color={colors.textOnPrimary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterChip: {
    backgroundColor: colors.surface,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    color: colors.text,
  },
  filterTextActive: {
    color: colors.textOnPrimary,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  opponentName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  direction: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  elo: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  time: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
  message: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 8,
    fontStyle: 'italic',
  },
  venue: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: colors.secondary,
  },
});
