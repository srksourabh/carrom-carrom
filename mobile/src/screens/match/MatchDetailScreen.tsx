import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Chip, Button, Divider } from 'react-native-paper';
import { Avatar } from '../../components/common/Avatar';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorDisplay } from '../../components/common/ErrorDisplay';
import { useMatchDetail, useConfirmMatch } from '../../hooks/useMatches';
import { useAuthStore } from '../../stores/authStore';
import { formatDate } from '../../utils/formatting';
import { colors } from '../../theme';

interface Props {
  route: any;
}

export function MatchDetailScreen({ route }: Props) {
  const { matchId } = route.params;
  const user = useAuthStore((s) => s.user);
  const { data: match, isLoading, error, refetch } = useMatchDetail(matchId);
  const confirmMatch = useConfirmMatch();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message="Failed to load match" onRetry={refetch} />;
  if (!match) return <ErrorDisplay message="Match not found" />;

  const canConfirm = match.status === 'PENDING' && match.player2.id === user?.id;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.statusRow}>
            <Chip
              style={{
                backgroundColor:
                  match.status === 'CONFIRMED' ? colors.success :
                  match.status === 'PENDING' ? colors.warning :
                  colors.error,
              }}
              textStyle={styles.chipText}
            >
              {match.status}
            </Chip>
            <Text style={styles.date}>{formatDate(match.playedAt)}</Text>
          </View>

          <View style={styles.playersRow}>
            <View style={styles.playerCol}>
              <Avatar uri={match.player1.avatarUrl} name={match.player1.name} size={56} />
              <Text style={styles.playerName}>{match.player1.name}</Text>
              <Text style={styles.playerElo}>ELO: {match.player1.eloRating}</Text>
            </View>

            <View style={styles.scoreCol}>
              <Text style={styles.scoreBig}>
                {match.player1Score} - {match.player2Score}
              </Text>
              {match.eloChangeP1 != null && (
                <Text style={styles.eloChange}>
                  {match.eloChangeP1 > 0 ? '+' : ''}{match.eloChangeP1} / {match.eloChangeP2 > 0 ? '+' : ''}{match.eloChangeP2}
                </Text>
              )}
            </View>

            <View style={styles.playerCol}>
              <Avatar uri={match.player2.avatarUrl} name={match.player2.name} size={56} />
              <Text style={styles.playerName}>{match.player2.name}</Text>
              <Text style={styles.playerElo}>ELO: {match.player2.eloRating}</Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          {match.venue && (
            <Text style={styles.metaText}>Venue: {match.venue}</Text>
          )}
          <Text style={styles.metaText}>Type: {match.matchType}</Text>
          {match.notes && (
            <Text style={styles.metaText}>Notes: {match.notes}</Text>
          )}

          {canConfirm && (
            <View style={styles.actions}>
              <Button
                mode="contained"
                onPress={() => confirmMatch.mutateAsync(matchId)}
                loading={confirmMatch.isPending}
                buttonColor={colors.success}
                style={styles.actionButton}
              >
                Confirm Result
              </Button>
            </View>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  card: {
    backgroundColor: colors.surface,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chipText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  date: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  playersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  playerCol: {
    alignItems: 'center',
    flex: 1,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  playerElo: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  scoreCol: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  scoreBig: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  eloChange: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  divider: {
    marginVertical: 16,
  },
  metaText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  actions: {
    marginTop: 16,
  },
  actionButton: {
    borderRadius: 8,
  },
});
