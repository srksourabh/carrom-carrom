import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { Text, Button, Chip, FAB, SegmentedButtons } from 'react-native-paper';
import { useOpenGames, useMyGames, useCreateGame, useJoinGame } from '../../hooks/useGame';
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
  WAITING: colors.warning,
  IN_PROGRESS: colors.success,
  COMPLETED: colors.primary,
  ABANDONED: colors.textSecondary,
};

export function GameLobbyScreen({ navigation }: Props) {
  const [tab, setTab] = useState('open');
  const user = useAuthStore((s) => s.user);
  const { data: openData, isLoading: openLoading, refetch: refetchOpen } = useOpenGames();
  const { data: myData, isLoading: myLoading, refetch: refetchMy } = useMyGames();
  const createGame = useCreateGame();
  const joinGame = useJoinGame();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    if (tab === 'open') await refetchOpen();
    else await refetchMy();
    setRefreshing(false);
  };

  const handleCreateGame = async () => {
    try {
      const game = await createGame.mutateAsync(25);
      navigation.navigate('GameRoom', { gameId: game.id });
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message || 'Failed to create game');
    }
  };

  const handleJoinGame = async (gameId: string) => {
    try {
      await joinGame.mutateAsync(gameId);
      navigation.navigate('GameRoom', { gameId });
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message || 'Failed to join game');
    }
  };

  const isLoading = tab === 'open' ? openLoading : myLoading;
  if (isLoading) return <LoadingSpinner message="Loading games..." />;

  const openGames = openData?.games || [];
  const myGames = myData?.games || [];

  const renderOpenGame = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <Avatar uri={item.player1.avatarUrl} name={item.player1.displayName || item.player1.name} size={44} />
        <View style={styles.cardInfo}>
          <Text style={styles.playerName}>{item.player1.displayName || item.player1.name}</Text>
          <Text style={styles.elo}>ELO: {item.player1.eloRating}</Text>
          <Text style={styles.target}>Target: {item.targetScore} pts</Text>
        </View>
        <Button
          mode="contained"
          onPress={() => handleJoinGame(item.id)}
          buttonColor={colors.primary}
          textColor={colors.textOnPrimary}
          compact
          loading={joinGame.isPending}
        >
          Join
        </Button>
      </View>
      <Text style={styles.time}>Created {formatRelativeTime(item.createdAt)}</Text>
    </TouchableOpacity>
  );

  const renderMyGame = ({ item }: { item: any }) => {
    const opponent = item.player1.id === user?.id ? item.player2 : item.player1;
    const myScore = item.player1.id === user?.id ? item.player1Score : item.player2Score;
    const oppScore = item.player1.id === user?.id ? item.player2Score : item.player1Score;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          if (item.status === 'COMPLETED' || item.status === 'ABANDONED') {
            navigation.navigate('GameResult', { gameId: item.id });
          } else {
            navigation.navigate('GameRoom', { gameId: item.id });
          }
        }}
      >
        <View style={styles.cardHeader}>
          {opponent ? (
            <Avatar uri={opponent.avatarUrl} name={opponent.displayName || opponent.name} size={44} />
          ) : (
            <View style={styles.waitingAvatar}>
              <Text style={styles.waitingText}>?</Text>
            </View>
          )}
          <View style={styles.cardInfo}>
            <Text style={styles.playerName}>
              {opponent ? (opponent.displayName || opponent.name) : 'Waiting for opponent...'}
            </Text>
            {opponent && <Text style={styles.elo}>ELO: {opponent.eloRating}</Text>}
            <Text style={styles.score}>Score: {myScore} - {oppScore}</Text>
          </View>
          <View style={styles.cardRight}>
            <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[item.status] }]}>
              <Text style={styles.statusText}>{item.status.replace('_', ' ')}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.time}>{formatRelativeTime(item.updatedAt)}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        <Chip
          selected={tab === 'open'}
          onPress={() => setTab('open')}
          style={[styles.tabChip, tab === 'open' && styles.tabChipActive]}
          textStyle={tab === 'open' ? styles.tabTextActive : styles.tabText}
        >
          Open Games
        </Chip>
        <Chip
          selected={tab === 'my'}
          onPress={() => setTab('my')}
          style={[styles.tabChip, tab === 'my' && styles.tabChipActive]}
          textStyle={tab === 'my' ? styles.tabTextActive : styles.tabText}
        >
          My Games
        </Chip>
        <Chip
          onPress={() => navigation.navigate('LiveStreamsList')}
          style={styles.tabChip}
          textStyle={styles.tabText}
        >
          Live Streams
        </Chip>
      </View>

      {tab === 'open' ? (
        <FlatList
          data={openGames}
          keyExtractor={(item) => item.id}
          renderItem={renderOpenGame}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={openGames.length === 0 ? styles.emptyContainer : styles.list}
          ListEmptyComponent={
            <EmptyState
              title="No open games"
              subtitle="Create a game and wait for an opponent!"
            />
          }
        />
      ) : (
        <FlatList
          data={myGames}
          keyExtractor={(item) => item.id}
          renderItem={renderMyGame}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={myGames.length === 0 ? styles.emptyContainer : styles.list}
          ListEmptyComponent={
            <EmptyState
              title="No games yet"
              subtitle="Create or join a game to start playing!"
            />
          }
        />
      )}

      <FAB
        icon="plus"
        label="New Game"
        style={styles.fab}
        onPress={handleCreateGame}
        color={colors.textOnPrimary}
        loading={createGame.isPending}
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
  playerName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  elo: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  target: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '600',
  },
  score: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
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
  waitingAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waitingText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  time: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: colors.primary,
  },
});
