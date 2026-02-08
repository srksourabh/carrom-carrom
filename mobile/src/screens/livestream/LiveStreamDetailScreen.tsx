import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { useLiveStream, useJoinStream, useLeaveStream, useEndStream } from '../../hooks/useLiveStreams';
import { useAuthStore } from '../../stores/authStore';
import { Avatar } from '../../components/common/Avatar';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { formatRelativeTime } from '../../utils/formatting';
import { colors } from '../../theme';

interface Props {
  navigation: any;
  route: any;
}

export function LiveStreamDetailScreen({ navigation, route }: Props) {
  const { streamId } = route.params;
  const user = useAuthStore((s) => s.user);
  const { data: stream, isLoading } = useLiveStream(streamId);
  const joinStream = useJoinStream();
  const leaveStream = useLeaveStream();
  const endStream = useEndStream();

  const isHost = stream?.host?.id === user?.id;

  useEffect(() => {
    if (stream && !isHost && stream.isLive) {
      joinStream.mutate(streamId);
      return () => {
        leaveStream.mutate(streamId);
      };
    }
  }, [stream?.id]);

  const handleEndStream = async () => {
    try {
      await endStream.mutateAsync(streamId);
      navigation.goBack();
    } catch {}
  };

  const handleWatchStream = () => {
    if (stream?.streamUrl) {
      Linking.openURL(stream.streamUrl);
    }
  };

  if (isLoading) return <LoadingSpinner message="Loading stream..." />;
  if (!stream) return null;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <Avatar
              uri={stream.host.avatarUrl}
              name={stream.host.displayName || stream.host.name}
              size={56}
            />
            <View style={styles.headerInfo}>
              <Text style={styles.title}>{stream.title}</Text>
              <Text style={styles.hostName}>{stream.host.displayName || stream.host.name}</Text>
              <Text style={styles.elo}>ELO: {stream.host.eloRating}</Text>
            </View>
            {stream.isLive ? (
              <View style={styles.liveBadge}>
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            ) : (
              <View style={styles.endedBadge}>
                <Text style={styles.endedText}>ENDED</Text>
              </View>
            )}
          </View>

          {stream.description && (
            <Text style={styles.description}>{stream.description}</Text>
          )}

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{stream.viewerCount}</Text>
              <Text style={styles.statLabel}>Viewers</Text>
            </View>
            {stream.startedAt && (
              <View style={styles.stat}>
                <Text style={styles.statValue}>{formatRelativeTime(stream.startedAt)}</Text>
                <Text style={styles.statLabel}>Started</Text>
              </View>
            )}
          </View>
        </Card.Content>
      </Card>

      <View style={styles.actions}>
        {stream.isLive && (
          <Button
            mode="contained"
            onPress={handleWatchStream}
            style={styles.watchButton}
            buttonColor={colors.primary}
            textColor={colors.textOnPrimary}
          >
            Watch Stream
          </Button>
        )}

        {isHost && stream.isLive && (
          <Button
            mode="outlined"
            onPress={handleEndStream}
            style={styles.endButton}
            textColor={colors.error}
            loading={endStream.isPending}
          >
            End Stream
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
  card: {
    margin: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  hostName: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  elo: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  liveBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  liveText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#fff',
  },
  endedBadge: {
    backgroundColor: colors.textSecondary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  endedText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 24,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  actions: {
    paddingHorizontal: 16,
    gap: 12,
  },
  watchButton: {
    borderRadius: 8,
  },
  endButton: {
    borderRadius: 8,
    borderColor: colors.error,
  },
});
