import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, Alert } from 'react-native';
import { Text, Button, Card, Divider, Chip } from 'react-native-paper';
import { useClubDetail, useClubMembers, useJoinClub, useLeaveClub } from '../../hooks/useClubs';
import { useAuthStore } from '../../stores/authStore';
import { useMyProfile } from '../../hooks/useUser';
import { Avatar } from '../../components/common/Avatar';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorDisplay } from '../../components/common/ErrorDisplay';
import { colors } from '../../theme';

interface Props {
  navigation: any;
  route: any;
}

export function ClubDetailScreen({ navigation, route }: Props) {
  const { clubId } = route.params;
  const { data: club, isLoading, error, refetch } = useClubDetail(clubId);
  const { data: membersData, refetch: refetchMembers } = useClubMembers(clubId);
  const { data: profile } = useMyProfile();
  const joinClub = useJoinClub();
  const leaveClub = useLeaveClub();

  if (isLoading) return <LoadingSpinner message="Loading club..." />;
  if (error || !club) return <ErrorDisplay message="Club not found" onRetry={refetch} />;

  const isMember = profile?.clubId === clubId;
  const members = membersData?.members || [];

  const handleJoin = async () => {
    try {
      await joinClub.mutateAsync(clubId);
      Alert.alert('Joined!', `You are now a member of ${club.name}`);
      refetch();
      refetchMembers();
    } catch (err: any) {
      Alert.alert('Error', err?.response?.data?.message || 'Failed to join club');
    }
  };

  const handleLeave = () => {
    Alert.alert('Leave Club', `Are you sure you want to leave ${club.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Leave',
        style: 'destructive',
        onPress: async () => {
          try {
            await leaveClub.mutateAsync();
            Alert.alert('Left', `You have left ${club.name}`);
            refetch();
            refetchMembers();
          } catch (err: any) {
            Alert.alert('Error', err?.response?.data?.message || 'Failed to leave club');
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Club Header */}
      <View style={styles.header}>
        <View style={styles.clubIcon}>
          <Text style={styles.clubIconText}>{club.name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.clubName}>{club.name}</Text>
        {club.district && (
          <Text style={styles.clubLocation}>
            {club.city ? `${club.city}, ` : ''}{club.district}, {club.state || 'West Bengal'}
          </Text>
        )}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{club._count?.members || 0}</Text>
            <Text style={styles.statLabel}>Members</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{club._count?.tournaments || 0}</Text>
            <Text style={styles.statLabel}>Tournaments</Text>
          </View>
          {club.foundedYear && (
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{club.foundedYear}</Text>
              <Text style={styles.statLabel}>Founded</Text>
            </View>
          )}
        </View>

        {!isMember ? (
          <Button
            mode="contained"
            onPress={handleJoin}
            loading={joinClub.isPending}
            style={styles.joinButton}
            buttonColor={colors.secondary}
          >
            Join Club
          </Button>
        ) : (
          <Button
            mode="outlined"
            onPress={handleLeave}
            loading={leaveClub.isPending}
            style={styles.leaveButton}
            textColor={colors.error}
          >
            Leave Club
          </Button>
        )}
      </View>

      {/* Description */}
      {club.description && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{club.description}</Text>
          </Card.Content>
        </Card>
      )}

      {/* Contact */}
      {(club.contactEmail || club.contactPhone) && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Contact</Text>
            {club.contactEmail && (
              <Text style={styles.contactText}>{club.contactEmail}</Text>
            )}
            {club.contactPhone && (
              <Text style={styles.contactText}>{club.contactPhone}</Text>
            )}
          </Card.Content>
        </Card>
      )}

      {/* Members */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>
            Members ({membersData?.total || 0})
          </Text>
          {members.length === 0 ? (
            <Text style={styles.emptyText}>No members yet</Text>
          ) : (
            members.map((member: any, index: number) => (
              <React.Fragment key={member.id}>
                <TouchableMember
                  member={member}
                  rank={index + 1}
                  onPress={() => navigation.navigate('RankingsTab', {
                    screen: 'PlayerDetail',
                    params: { userId: member.id },
                  })}
                />
                {index < members.length - 1 && <Divider style={styles.memberDivider} />}
              </React.Fragment>
            ))
          )}
        </Card.Content>
      </Card>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

function TouchableMember({ member, rank, onPress }: { member: any; rank: number; onPress: () => void }) {
  return (
    <View style={styles.memberRow}>
      <Text style={styles.memberRank}>#{rank}</Text>
      <Avatar uri={member.avatarUrl} name={member.displayName || member.name} size={36} />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{member.displayName || member.name}</Text>
        <Text style={styles.memberMeta}>
          ELO: {member.eloRating} | W: {member.wins} L: {member.losses}
        </Text>
      </View>
      {member.role !== 'PLAYER' && (
        <Chip compact style={styles.roleBadge} textStyle={styles.roleText}>
          {member.role === 'CLUB_ADMIN' ? 'Admin' : member.role === 'SUPER_ADMIN' ? 'Super' : 'Mod'}
        </Chip>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  clubIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  clubIconText: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.textOnPrimary,
  },
  clubName: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textOnPrimary,
  },
  clubLocation: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textOnPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
  },
  joinButton: {
    marginTop: 16,
    width: '100%',
  },
  leaveButton: {
    marginTop: 16,
    width: '100%',
    borderColor: 'rgba(255,255,255,0.5)',
  },
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: colors.surface,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  contactText: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  memberRank: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
    width: 30,
  },
  memberInfo: {
    flex: 1,
    marginLeft: 10,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  memberMeta: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  memberDivider: {
    marginVertical: 2,
  },
  roleBadge: {
    backgroundColor: colors.primaryLight,
    height: 24,
  },
  roleText: {
    fontSize: 10,
    color: colors.textOnPrimary,
  },
});
