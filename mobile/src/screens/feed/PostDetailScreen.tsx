import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, TextInput, Button, Divider } from 'react-native-paper';
import { usePostDetail, useToggleLike, useAddComment, useDeletePost } from '../../hooks/useFeed';
import { useAuthStore } from '../../stores/authStore';
import { Avatar } from '../../components/common/Avatar';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorDisplay } from '../../components/common/ErrorDisplay';
import { formatRelativeTime } from '../../utils/formatting';
import { colors } from '../../theme';

interface Props {
  navigation: any;
  route: any;
}

export function PostDetailScreen({ navigation, route }: Props) {
  const { postId } = route.params;
  const user = useAuthStore((s) => s.user);
  const { data: post, isLoading, error, refetch } = usePostDetail(postId);
  const toggleLike = useToggleLike();
  const addComment = useAddComment();
  const deletePost = useDeletePost();
  const [comment, setComment] = useState('');

  if (isLoading) return <LoadingSpinner message="Loading post..." />;
  if (error || !post) return <ErrorDisplay message="Post not found" onRetry={refetch} />;

  const isOwner = post.user.id === user?.id;

  const handleLike = async () => {
    try {
      await toggleLike.mutateAsync(postId);
      refetch();
    } catch {}
  };

  const handleComment = async () => {
    if (!comment.trim()) return;
    try {
      await addComment.mutateAsync({ postId, content: comment.trim() });
      setComment('');
      refetch();
    } catch (err: any) {
      Alert.alert('Error', err?.response?.data?.message || 'Failed to add comment');
    }
  };

  const handleDelete = () => {
    Alert.alert('Delete Post', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deletePost.mutateAsync(postId);
            navigation.goBack();
          } catch (err: any) {
            Alert.alert('Error', err?.response?.data?.message || 'Failed to delete');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Post */}
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <Avatar uri={post.user.avatarUrl} name={post.user.displayName || post.user.name} size={44} />
            <View style={styles.postHeaderInfo}>
              <Text style={styles.authorName}>{post.user.displayName || post.user.name}</Text>
              <Text style={styles.postTime}>{formatRelativeTime(post.createdAt)}</Text>
            </View>
            {isOwner && (
              <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.postContent}>{post.content}</Text>

          <View style={styles.statsRow}>
            <Text style={styles.statText}>{post._count?.postLikes || post.likes || 0} likes</Text>
            <Text style={styles.statText}>{post._count?.comments || 0} comments</Text>
          </View>

          <Divider />

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionBtn} onPress={handleLike}>
              <Text style={[styles.actionText, post.isLiked && styles.actionTextActive]}>
                {post.isLiked ? 'Liked' : 'Like'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Comments */}
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comments</Text>
          {(post.comments || []).map((c: any) => (
            <View key={c.id} style={styles.commentCard}>
              <Avatar uri={c.user.avatarUrl} name={c.user.displayName || c.user.name} size={32} />
              <View style={styles.commentBody}>
                <Text style={styles.commentAuthor}>{c.user.displayName || c.user.name}</Text>
                <Text style={styles.commentContent}>{c.content}</Text>
                <Text style={styles.commentTime}>{formatRelativeTime(c.createdAt)}</Text>
              </View>
            </View>
          ))}
          {(post.comments || []).length === 0 && (
            <Text style={styles.noComments}>No comments yet. Be the first!</Text>
          )}
        </View>
      </ScrollView>

      {/* Comment input */}
      <View style={styles.commentInput}>
        <TextInput
          mode="outlined"
          placeholder="Write a comment..."
          value={comment}
          onChangeText={setComment}
          style={styles.commentTextInput}
          maxLength={500}
          dense
        />
        <Button
          mode="contained"
          onPress={handleComment}
          loading={addComment.isPending}
          disabled={!comment.trim()}
          compact
          buttonColor={colors.primary}
          style={styles.sendBtn}
        >
          Send
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  postCard: {
    backgroundColor: colors.surface,
    padding: 16,
    marginBottom: 8,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postHeaderInfo: {
    flex: 1,
    marginLeft: 10,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  postTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  deleteText: {
    fontSize: 13,
    color: colors.error,
    fontWeight: '600',
  },
  postContent: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 10,
  },
  statText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  actionsRow: {
    flexDirection: 'row',
    paddingTop: 10,
    gap: 24,
  },
  actionBtn: {
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  actionTextActive: {
    color: colors.primary,
  },
  commentsSection: {
    padding: 16,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  commentCard: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentBody: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: colors.surfaceVariant,
    padding: 10,
    borderRadius: 10,
  },
  commentAuthor: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  commentContent: {
    fontSize: 14,
    color: colors.text,
    marginTop: 2,
  },
  commentTime: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
  noComments: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    gap: 8,
  },
  commentTextInput: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  sendBtn: {
    borderRadius: 8,
  },
});
