import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { useGame, useMakeMove, useAbandonGame } from '../../hooks/useGame';
import { useAuthStore } from '../../stores/authStore';
import { CarromBoard } from '../../components/game/CarromBoard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { colors } from '../../theme';

interface Props {
  navigation: any;
  route: any;
}

const BOARD_SIZE = 700;

export function GameRoomScreen({ navigation, route }: Props) {
  const { gameId } = route.params;
  const user = useAuthStore((s) => s.user);
  const { data: game, isLoading } = useGame(gameId);
  const makeMove = useMakeMove();
  const abandonGame = useAbandonGame();

  const [strikerX, setStrikerX] = useState(BOARD_SIZE / 2);
  const [angle, setAngle] = useState(270); // Default: aim up
  const [power, setPower] = useState(5);

  useEffect(() => {
    if (game?.status === 'COMPLETED' || game?.status === 'ABANDONED') {
      navigation.replace('GameResult', { gameId });
    }
  }, [game?.status]);

  if (isLoading) return <LoadingSpinner message="Loading game..." />;
  if (!game) return null;

  const isPlayer1 = game.player1Id === user?.id;
  const myColor = isPlayer1 ? (game.gameState as any)?.player1Color : (game.gameState as any)?.player2Color;
  const isMyTurn = game.currentTurn === user?.id;
  const pieces = (game.gameState as any)?.pieces || [];

  const strikerY = isPlayer1 ? BOARD_SIZE - 70 : 70;
  const defaultAngle = isPlayer1 ? 270 : 90;

  const myScore = isPlayer1 ? game.player1Score : game.player2Score;
  const oppScore = isPlayer1 ? game.player2Score : game.player1Score;
  const opponent = isPlayer1 ? game.player2 : game.player1;

  const handleStrike = async () => {
    if (!isMyTurn) return;
    try {
      const result = await makeMove.mutateAsync({
        gameId,
        move: { strikerX, angle, power },
      });
      const mr = result.moveResult;
      if (mr.foul) {
        Alert.alert('Foul!', 'Striker was pocketed. -1 point.');
      } else if (mr.pocketed.length > 0) {
        const pocketedNames = mr.pocketed.map((p: any) => p.type).join(', ');
        Alert.alert(
          mr.continueTurn ? 'Nice shot!' : 'Shot result',
          `Pocketed: ${pocketedNames}${mr.continueTurn ? '\nYour turn again!' : ''}`
        );
      }
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message || 'Failed to make move');
    }
  };

  const handleAbandon = () => {
    Alert.alert('Abandon Game', 'Are you sure? Your opponent will win.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Abandon',
        style: 'destructive',
        onPress: async () => {
          try {
            await abandonGame.mutateAsync(gameId);
            navigation.goBack();
          } catch {}
        },
      },
    ]);
  };

  if (game.status === 'WAITING') {
    return (
      <View style={styles.waitingContainer}>
        <Text style={styles.waitingTitle}>Waiting for opponent...</Text>
        <Text style={styles.waitingSubtitle}>Share this game with a friend or wait for someone to join</Text>
        <CarromBoard pieces={pieces} />
        <Button
          mode="outlined"
          onPress={handleAbandon}
          style={styles.abandonButton}
          textColor={colors.error}
        >
          Cancel Game
        </Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Score header */}
      <Card style={styles.scoreCard}>
        <Card.Content style={styles.scoreRow}>
          <View style={styles.playerScore}>
            <View style={[styles.colorDot, { backgroundColor: myColor === 'white' ? '#FFF8E1' : '#37474F' }]} />
            <Text style={styles.scoreLabel}>You</Text>
            <Text style={styles.scoreValue}>{myScore}</Text>
          </View>
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
            <Text style={styles.targetText}>Target: {game.targetScore}</Text>
          </View>
          <View style={styles.playerScore}>
            <View style={[styles.colorDot, { backgroundColor: myColor === 'white' ? '#37474F' : '#FFF8E1' }]} />
            <Text style={styles.scoreLabel}>{opponent?.displayName || opponent?.name || '?'}</Text>
            <Text style={styles.scoreValue}>{oppScore}</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Turn indicator */}
      <View style={[styles.turnBanner, isMyTurn ? styles.myTurnBanner : styles.oppTurnBanner]}>
        <Text style={styles.turnText}>
          {isMyTurn ? 'Your Turn - Aim and Strike!' : "Opponent's Turn - Waiting..."}
        </Text>
      </View>

      {/* Board */}
      <CarromBoard
        pieces={pieces}
        strikerX={isMyTurn ? strikerX : undefined}
        strikerY={isMyTurn ? strikerY : undefined}
        isMyTurn={isMyTurn}
      />

      {/* Controls - only when it's my turn */}
      {isMyTurn && (
        <View style={styles.controls}>
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Position</Text>
            <View style={styles.sliderRow}>
              <Text style={styles.sliderValue}>{Math.round(strikerX)}</Text>
              <View style={styles.sliderContainer}>
                <Slider
                  minimumValue={100}
                  maximumValue={600}
                  value={strikerX}
                  onValueChange={setStrikerX}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.border}
                  thumbTintColor={colors.primary}
                />
              </View>
            </View>
          </View>

          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Angle</Text>
            <View style={styles.sliderRow}>
              <Text style={styles.sliderValue}>{Math.round(angle)}°</Text>
              <View style={styles.sliderContainer}>
                <Slider
                  minimumValue={0}
                  maximumValue={360}
                  value={angle}
                  onValueChange={setAngle}
                  minimumTrackTintColor={colors.secondary}
                  maximumTrackTintColor={colors.border}
                  thumbTintColor={colors.secondary}
                />
              </View>
            </View>
          </View>

          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Power</Text>
            <View style={styles.sliderRow}>
              <Text style={styles.sliderValue}>{Math.round(power)}</Text>
              <View style={styles.sliderContainer}>
                <Slider
                  minimumValue={1}
                  maximumValue={10}
                  step={1}
                  value={power}
                  onValueChange={setPower}
                  minimumTrackTintColor={colors.error}
                  maximumTrackTintColor={colors.border}
                  thumbTintColor={colors.error}
                />
              </View>
            </View>
          </View>

          <Button
            mode="contained"
            onPress={handleStrike}
            style={styles.strikeButton}
            buttonColor={colors.primary}
            textColor={colors.textOnPrimary}
            loading={makeMove.isPending}
          >
            Strike!
          </Button>
        </View>
      )}

      <Button
        mode="text"
        onPress={handleAbandon}
        textColor={colors.error}
        style={styles.abandonButton}
      >
        Abandon Game
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  waitingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  waitingTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  waitingSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  scoreCard: {
    margin: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerScore: {
    alignItems: 'center',
    flex: 1,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 4,
  },
  scoreLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  vsContainer: {
    alignItems: 'center',
  },
  vsText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  targetText: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  turnBanner: {
    paddingVertical: 8,
    alignItems: 'center',
    marginHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  myTurnBanner: {
    backgroundColor: '#E8F5E9',
  },
  oppTurnBanner: {
    backgroundColor: '#FFF3E0',
  },
  turnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  controls: {
    padding: 16,
    backgroundColor: colors.surface,
    margin: 12,
    borderRadius: 12,
  },
  controlRow: {
    marginBottom: 12,
  },
  controlLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    width: 40,
    textAlign: 'right',
    marginRight: 8,
  },
  sliderContainer: {
    flex: 1,
  },
  strikeButton: {
    marginTop: 8,
    borderRadius: 8,
    paddingVertical: 4,
  },
  abandonButton: {
    marginTop: 16,
    marginBottom: 24,
    alignSelf: 'center',
  },
});
