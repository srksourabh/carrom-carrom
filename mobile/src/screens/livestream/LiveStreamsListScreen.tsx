import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Text, FAB, Chip } from 'react-native-paper';
import { useLiveStreams } from '../../hooks/useLiveStreams';
import { Avatar } from '../../components/common/Avatar';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { formatRelativeTime } from '../../utils/formatting';
import { colors } from '../../theme';

interface Props {
  navigation: any;
}

export function LiveStreamsListScreen({ navigation }: Props) {
  const [liveOnly, setLiveOnly] = useState(true);
  const { data, isLoading, refetch } = useLiveStreams(1, liveOnly);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) return <LoadingSpinner message="Loading streams..." />;

  const streams = data?.streams || [];

  const renderStream = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('LiveStreamDetail', { streamId: item.id })}
    >
      <View style={styles.cardHeader}>
        <Avatar uri={item.host.avatarUrl} name={item.host.displayName || item.host.name} size={44} />
        <View style={styles.cardInfo}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.hostName}>{item.host.displayName || item.host.name}</Text>
          <Text style={styles.elo}>ELO: {item.host.eloRating}</Text>
        </View>
        <View style={styles.cardRight}>
          {item.isLive ? (
            <View style={styles.liveBadge}>
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          ) : (
            <Text style={styles.endedText}>Ended</Text>
          )}
          <Text style={styles.viewers}>{item.viewerCount} watching</Text>
        </View>
      </View>
      {item.description && (
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      )}
      {item.startedAt && (
        <Text style={styles.time}>Started {formatRelativeTime(item.startedAt)}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        <Chip
          selected={liveOnly}
          onPress={() => setLiveOnly(true)}
          style={[styles.filterChip, liveOnly && styles.filterChipActive]}
          textStyle={liveOnly ? styles.filterTextActive : styles.filterText}
        >
          Live Now
        </Chip>
        <Chip
          selected={!liveOnly}
          onPress={() => setLiveOnly(false)}
          style={[styles.filterChip, !liveOnly && styles.filterChipActive]}
          textStyle={!liveOnly ? styles.filterTextActive : styles.filterText}
        >
          All Streams
        </Chip>
      </View>

      <FlatList
        data={streams}
        keyExtractor={(item) => item.id}
        renderItem={renderStream}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={streams.length === 0 ? styles.emptyContainer : styles.list}
        ListEmptyComponent={
          <EmptyState
            title="No streams yet"
            subtitle={liveOnly ? 'No one is streaming right now. Be the first!' : 'No streams found.'}
          />
        }
      />

      <FAB
        icon="plus"
        label="Go Live"
        style={styles.fab}
        onPress={() => navigation.navigate('CreateLiveStream')}
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
    backgroundColor: colors.error,
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
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  hostName: {
    fontSize: 13,
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
  liveBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#fff',
  },
  endedText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  viewers: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 8,
  },
  time: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: colors.error,
  },
});
