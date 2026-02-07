import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Text, FAB, Badge } from 'react-native-paper';
import { useConversations } from '../../hooks/useChat';
import { Avatar } from '../../components/common/Avatar';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { formatRelativeTime } from '../../utils/formatting';
import { colors } from '../../theme';

interface Props {
  navigation: any;
}

export function ConversationsListScreen({ navigation }: Props) {
  const { data, isLoading, refetch } = useConversations();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) return <LoadingSpinner message="Loading messages..." />;

  const conversations = data?.conversations || [];

  const renderConversation = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Chat', {
        conversationId: item.id,
        otherUserName: item.otherUser.displayName || item.otherUser.name,
      })}
    >
      <View style={styles.avatarContainer}>
        <Avatar uri={item.otherUser.avatarUrl} name={item.otherUser.displayName || item.otherUser.name} size={50} />
        {item.unreadCount > 0 && (
          <Badge style={styles.badge} size={18}>{item.unreadCount}</Badge>
        )}
      </View>
      <View style={styles.cardInfo}>
        <Text style={[styles.userName, item.unreadCount > 0 && styles.userNameUnread]}>
          {item.otherUser.displayName || item.otherUser.name}
        </Text>
        {item.lastMessage && (
          <Text
            style={[styles.lastMessage, item.unreadCount > 0 && styles.lastMessageUnread]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
        )}
      </View>
      {item.lastMessageAt && (
        <Text style={styles.time}>{formatRelativeTime(item.lastMessageAt)}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={conversations.length === 0 ? styles.emptyContainer : styles.list}
        ListEmptyComponent={
          <EmptyState
            title="No conversations yet"
            subtitle="Start a chat with a player from the rankings or challenges!"
          />
        }
      />

      <FAB
        icon="plus"
        label="New Chat"
        style={styles.fab}
        onPress={() => navigation.navigate('NewChat')}
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
  list: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  avatarContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: colors.error,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  userNameUnread: {
    fontWeight: '800',
  },
  lastMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  lastMessageUnread: {
    color: colors.text,
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: colors.primary,
  },
});
