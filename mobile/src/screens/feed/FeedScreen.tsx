import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Text, FAB, Chip } from 'react-native-paper';
import { useFeed, useExploreFeed, useToggleLike } from '../../hooks/useFeed';
import { useAuthStore } from '../../stores/authStore';
import { Avatar } from '../../components/common/Avatar';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { formatRelativeTime } from '../../utils/formatting';
import { colors } from '../../theme';

interface Props {
  navigation: any;
}

export function FeedScreen({ navigation }: Props) {
  const [tab, setTab] = useState<'feed' | 'explore'>('explore');
  const user = useAuthStore((s) => s.user);
  const { data: feedData, isLoading: feedLoading, refetch: refetchFeed } = useFeed();
  const { data: exploreData, isLoading: exploreLoading, refetch: refetchExplore } = useExploreFeed();
  const toggleLike = useToggleLike();
  const [refreshing, setRefreshing] = useState(false);

  const isLoading = tab === 'feed' ? feedLoading : exploreLoading;
  const data = tab === 'feed' ? feedData : exploreData;
  const refetch = tab === 'feed' ? refetchFeed : refetchExplore;

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) return <LoadingSpinner message="Loading feed..." />;

  const posts = data?.posts || [];

  const handleLike = async (postId: string) => {
    try {
      await toggleLike.mutateAsync(postId);
    } catch {}
  };

  const renderPost = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.postCard}
      onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
      activeOpacity={0.7}
    >
      <View style={styles.postHeader}>
        <Avatar uri={item.user.avatarUrl} name={item.user.displayName || item.user.name} size={40} />
        <View style={styles.postHeaderInfo}>
          <Text style={styles.authorName}>{item.user.displayName || item.user.name}</Text>
          <Text style={styles.postTime}>{formatRelativeTime(item.createdAt)}</Text>
        </View>
      </View>

      <Text style={styles.postContent}>{item.content}</Text>

      {item.imageUrl && (
        <View style={styles.imageContainer}>
          <Text style={styles.imageLabel}>[Image]</Text>
        </View>
      )}

      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => handleLike(item.id)}
        >
          <Text style={[styles.actionText, item.isLiked && styles.actionTextActive]}>
            {item.isLiked ? 'Liked' : 'Like'} ({item._count?.postLikes || item.likes || 0})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
        >
          <Text style={styles.actionText}>
            Comment ({item._count?.comments || 0})
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        <Chip
          selected={tab === 'explore'}
          onPress={() => setTab('explore')}
          style={[styles.tabChip, tab === 'explore' && styles.tabChipActive]}
          textStyle={tab === 'explore' ? styles.tabTextActive : styles.tabText}
        >
          Explore
        </Chip>
        <Chip
          selected={tab === 'feed'}
          onPress={() => setTab('feed')}
          style={[styles.tabChip, tab === 'feed' && styles.tabChipActive]}
          textStyle={tab === 'feed' ? styles.tabTextActive : styles.tabText}
        >
          Following
        </Chip>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={posts.length === 0 ? styles.emptyContainer : styles.list}
        ListEmptyComponent={
          <EmptyState
            title={tab === 'feed' ? 'No posts from people you follow' : 'No posts yet'}
            subtitle="Be the first to share something!"
          />
        }
      />

      <FAB
        icon="plus"
        label="Post"
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost')}
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
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  tabChip: {
    backgroundColor: colors.surface,
  },
  tabChipActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.text,
  },
  tabTextActive: {
    color: colors.textOnPrimary,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
  },
  postCard: {
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
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postHeaderInfo: {
    marginLeft: 10,
    flex: 1,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  postTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  postContent: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  imageContainer: {
    backgroundColor: colors.surfaceVariant,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  imageLabel: {
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingTop: 10,
    gap: 24,
  },
  actionBtn: {
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  actionTextActive: {
    color: colors.primary,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: colors.secondary,
  },
});
