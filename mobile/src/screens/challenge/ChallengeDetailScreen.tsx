import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-paper';
import { useChallengeDetail, useRespondToChallenge, useCancelChallenge } from '../../hooks/useChallenges';
import { useAuthStore } from '../../stores/authStore';
import { Avatar } from '../../components/common/Avatar';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorDisplay } from '../../components/common/ErrorDisplay';
import { formatDateTime, formatRelativeTime } from '../../utils/formatting';
import { colors } from '../../theme';

interface Props {
  navigation: any;
  route: any;
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: colors.warning,
  ACCEPTED: colors.success,
  DECLINED: colors.error,
  COMPLETED: colors.primary,
  EXPIRED: colors.textSecondary,
};

export function ChallengeDetailScreen({ navigation, route }: Props) {
  const { challengeId } = route.params;
  const user = useAuthStore((s) => s.user);
  const { data: challenge, isLoading, error, refetch } = useChallengeDetail(challengeId);
  const respondMutation = useRespondToChallenge();
  const cancelMutation = useCancelChallenge();

  if (isLoading) return <LoadingSpinner message="Loading challenge..." />;
  if (error || !challenge) return <ErrorDisplay message="Challenge not found" onRetry={refetch} />;

  const isSender = challenge.sender.id === user?.id;
  const isReceiver = challenge.receiver.id === user?.id;
  const isPending = challenge.status === 'PENDING';

  const handleRespond = (action: 'accept' | 'decline') => {
    Alert.alert(
      `${action === 'accept' ? 'Accept' : 'Decline'} Challenge`,
      `Are you sure you want to ${action} this challenge?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: action === 'accept' ? 'Accept' : 'Decline',
          style: action === 'decline' ? 'destructive' : 'default',
          onPress: async () => {
            try {
              await respondMutation.mutateAsync({ id: challengeId, action });
              refetch();
            } catch (err: any) {
              Alert.alert('Error', err?.response?.data?.message || 'Failed to respond');
            }
          },
        },
      ]
    );
  };

  const handleCancel = () => {
    Alert.alert('Cancel Challenge', 'Are you sure you want to cancel this challenge?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes, Cancel',
        style: 'destructive',
        onPress: async () => {
          try {
            await cancelMutation.mutateAsync(challengeId);
            navigation.goBack();
          } catch (err: any) {
            Alert.alert('Error', err?.response?.data?.message || 'Failed to cancel');
          }
        },
      },
    ]);
  };

  const PlayerCard = ({ player, label }: { player: any; label: string }) => (
    <View style={styles.playerCard}>
      <Avatar uri={player.avatarUrl} name={player.displayName || player.name} size={56} />
      <Text style={styles.playerLabel}>{label}</Text>
      <Text style={styles.playerName}>{player.displayName || player.name}</Text>
      <Text style={styles.playerElo}>ELO: {player.eloRating}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Status banner */}
        <View style={[styles.statusBanner, { backgroundColor: STATUS_COLORS[challenge.status] }]}>
          <Text style={styles.statusBannerText}>{challenge.status}</Text>
        </View>

        {/* Players */}
        <View style={styles.playersRow}>
          <PlayerCard player={challenge.sender} label="Challenger" />
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          <PlayerCard player={challenge.receiver} label="Challenged" />
        </View>

        <Divider style={styles.divider} />

        {/* Details */}
        <Card style={styles.detailCard}>
          <Card.Content>
            {challenge.message && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Message</Text>
                <Text style={styles.detailValue}>{challenge.message}</Text>
              </View>
            )}
            {challenge.proposedVenue && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Venue</Text>
                <Text style={styles.detailValue}>{challenge.proposedVenue}</Text>
              </View>
            )}
            {challenge.proposedDate && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Proposed Date</Text>
                <Text style={styles.detailValue}>{formatDateTime(challenge.proposedDate)}</Text>
              </View>
            )}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Sent</Text>
              <Text style={styles.detailValue}>{formatRelativeTime(challenge.createdAt)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Expires</Text>
              <Text style={styles.detailValue}>{formatDateTime(challenge.expiresAt)}</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Actions */}
        {isPending && isReceiver && (
          <View style={styles.actionRow}>
            <Button
              mode="contained"
              onPress={() => handleRespond('accept')}
              loading={respondMutation.isPending}
              style={[styles.actionBtn, { flex: 1 }]}
              buttonColor={colors.success}
            >
              Accept
            </Button>
            <Button
              mode="outlined"
              onPress={() => handleRespond('decline')}
              loading={respondMutation.isPending}
              style={[styles.actionBtn, { flex: 1 }]}
              textColor={colors.error}
            >
              Decline
            </Button>
          </View>
        )}

        {isPending && isSender && (
          <Button
            mode="outlined"
            onPress={handleCancel}
            loading={cancelMutation.isPending}
            textColor={colors.error}
            style={styles.cancelBtn}
          >
            Cancel Challenge
          </Button>
        )}

        {challenge.status === 'ACCEPTED' && (
          <Button
            mode="contained"
            onPress={() => navigation.navigate('MatchTab', {
              screen: 'RecordMatch',
              params: {
                opponentId: isSender ? challenge.receiver.id : challenge.sender.id,
                opponentName: isSender
                  ? (challenge.receiver.displayName || challenge.receiver.name)
                  : (challenge.sender.displayName || challenge.sender.name),
              },
            })}
            style={styles.recordBtn}
            buttonColor={colors.primary}
          >
            Record Match Result
          </Button>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  statusBanner: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  statusBannerText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  playersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  playerCard: {
    flex: 1,
    alignItems: 'center',
  },
  playerLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 8,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  playerName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginTop: 4,
    textAlign: 'center',
  },
  playerElo: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  vsContainer: {
    paddingHorizontal: 12,
  },
  vsText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.secondary,
  },
  divider: {
    marginVertical: 16,
  },
  detailCard: {
    backgroundColor: colors.surface,
    marginBottom: 20,
  },
  detailRow: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    color: colors.text,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    marginBottom: 12,
  },
  cancelBtn: {
    marginTop: 4,
    borderColor: colors.error,
  },
  recordBtn: {
    marginTop: 4,
  },
});
