import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { useGame, useGameMoves } from '../../hooks/useGame';
import { useAuthStore } from '../../stores/authStore';
import { CarromBoard } from '../../components/game/CarromBoard';
import { Avatar } from '../../components/common/Avatar';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { formatRelativeTime } from '../../utils/formatting';
import { colors } from '../../theme';

interface Props {
  navigation: any;
  route: any;
}

export function GameResultScreen({ navigation, route }: Props) {
  const { gameId } = route.params;
  const user = useAuthStore((s) => s.user);
  const { data: game, isLoading } = useGame(gameId);
  const { data: moves } = useGameMoves(gameId);

  if (isLoading) return <LoadingSpinner message="Loading result..." />;
  if (!game) return null;

  const isPlayer1 = game.player1Id === user?.id;
  const myScore = isPlayer1 ? game.player1Score : game.player2Score;
  const oppScore = isPlayer1 ? game.player2Score : game.player1Score;
  const opponent = isPlayer1 ? game.player2 : game.player1;
  const isWinner = game.winnerId === user?.id;
  const isDraw = !game.winnerId;
  const pieces = (game.gameState as any)?.pieces || [];

  return (
    <ScrollView style={styles.container}>
      {/* Result banner */}
      <View style={[styles.resultBanner, isWinner ? styles.winBanner : isDraw ? styles.drawBanner : styles.loseBanner]}>
        <Text style={styles.resultEmoji}>
          {isWinner ? 'Victory!' : isDraw ? 'Draw!' : 'Defeat'}
        </Text>
        <Text style={styles.resultSubtext}>
          {game.status === 'ABANDONED' ? 'Game was abandoned' : `Final Score: ${myScore} - ${oppScore}`}
        </Text>
      </View>

      {/* Players */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.playersRow}>
            <View style={styles.playerCol}>
              <Avatar
                uri={isPlayer1 ? game.player1.avatarUrl : game.player2?.avatarUrl}
                name={isPlayer1 ? game.player1.name : (game.player2?.name || '?')}
                size={56}
              />
              <Text style={styles.playerName}>You</Text>
              <Text style={styles.bigScore}>{myScore}</Text>
            </View>
            <Text style={styles.vs}>VS</Text>
            <View style={styles.playerCol}>
              <Avatar
                uri={opponent?.avatarUrl}
                name={opponent?.displayName || opponent?.name || '?'}
                size={56}
              />
              <Text style={styles.playerName}>{opponent?.displayName || opponent?.name || '?'}</Text>
              <Text style={styles.bigScore}>{oppScore}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Final board state */}
      <Text style={styles.sectionTitle}>Final Board</Text>
      <CarromBoard pieces={pieces} />

      {/* Move history */}
      {moves && moves.length > 0 && (
        <View style={styles.movesSection}>
          <Text style={styles.sectionTitle}>Move History ({moves.length} moves)</Text>
          {moves.slice(-10).map((move: any, idx: number) => (
            <View key={move.id} style={styles.moveRow}>
              <Text style={styles.moveIndex}>#{moves.length - 10 + idx + 1}</Text>
              <Text style={styles.moveName}>{move.player.displayName || move.player.name}</Text>
              <View style={[styles.moveTypeBadge, { backgroundColor: move.moveType === 'FOUL' ? colors.error : move.moveType === 'STRIKE' ? colors.success : colors.textSecondary }]}>
                <Text style={styles.moveTypeText}>{move.moveType}</Text>
              </View>
              <Text style={styles.moveTime}>{formatRelativeTime(move.createdAt)}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.actions}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('GameLobby')}
          buttonColor={colors.primary}
          textColor={colors.textOnPrimary}
          style={styles.button}
        >
          Back to Lobby
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  resultBanner: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  winBanner: {
    backgroundColor: '#E8F5E9',
  },
  loseBanner: {
    backgroundColor: '#FFEBEE',
  },
  drawBanner: {
    backgroundColor: '#FFF3E0',
  },
  resultEmoji: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  resultSubtext: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  card: {
    margin: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  playersRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  playerCol: {
    alignItems: 'center',
    flex: 1,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
  },
  bigScore: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.primary,
  },
  vs: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  movesSection: {
    paddingHorizontal: 16,
  },
  moveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  moveIndex: {
    fontSize: 12,
    color: colors.textSecondary,
    width: 30,
  },
  moveName: {
    fontSize: 13,
    color: colors.text,
    flex: 1,
  },
  moveTypeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  moveTypeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  moveTime: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  actions: {
    padding: 16,
    paddingBottom: 32,
  },
  button: {
    borderRadius: 8,
  },
});
