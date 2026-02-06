import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { Avatar } from '../common/Avatar';
import { formatDate, formatScore } from '../../utils/formatting';
import { colors } from '../../theme';

interface Props {
  match: any;
  currentUserId: string;
  onPress?: () => void;
}

export function MatchCard({ match, currentUserId, onPress }: Props) {
  const isPlayer1 = match.player1.id === currentUserId;
  const opponent = isPlayer1 ? match.player2 : match.player1;
  const myScore = isPlayer1 ? match.player1Score : match.player2Score;
  const oppScore = isPlayer1 ? match.player2Score : match.player1Score;
  const won = match.winnerId === currentUserId;
  const isDraw = !match.winnerId;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <View style={styles.left}>
            <Avatar uri={opponent.avatarUrl} name={opponent.name} size={40} />
            <View style={styles.info}>
              <Text style={styles.name}>vs {opponent.name}</Text>
              <Text style={styles.meta}>
                {formatDate(match.playedAt)}
                {match.venue ? ` | ${match.venue}` : ''}
              </Text>
            </View>
          </View>
          <View style={styles.right}>
            <Text style={[styles.score, won ? styles.won : isDraw ? styles.draw : styles.lost]}>
              {formatScore(myScore, oppScore)}
            </Text>
            <Chip
              style={[
                styles.chip,
                { backgroundColor: won ? colors.success : isDraw ? colors.warning : colors.error },
              ]}
              textStyle={styles.chipText}
            >
              {won ? 'W' : isDraw ? 'D' : 'L'}
            </Chip>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 4,
    backgroundColor: colors.surface,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  meta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 18,
    fontWeight: '700',
  },
  won: { color: colors.success },
  lost: { color: colors.error },
  draw: { color: colors.warning },
  chip: {
    marginTop: 4,
    height: 24,
  },
  chipText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
});
