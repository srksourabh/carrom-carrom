import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Text, Searchbar } from 'react-native-paper';
import { useClubs } from '../../hooks/useClubs';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { colors } from '../../theme';

interface Props {
  navigation: any;
}

export function ClubsListScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');
  const { data, isLoading, refetch } = useClubs(1, undefined, search || undefined);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) return <LoadingSpinner message="Loading clubs..." />;

  const clubs = data?.clubs || [];

  const renderClub = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ClubDetail', { clubId: item.id })}
    >
      <View style={styles.clubIcon}>
        <Text style={styles.clubIconText}>{item.name.charAt(0).toUpperCase()}</Text>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.clubName}>{item.name}</Text>
        {item.district && (
          <Text style={styles.clubLocation}>{item.city ? `${item.city}, ` : ''}{item.district}</Text>
        )}
        {item.description && (
          <Text style={styles.clubDesc} numberOfLines={2}>{item.description}</Text>
        )}
      </View>
      <View style={styles.cardStats}>
        <Text style={styles.statValue}>{item._count?.members || 0}</Text>
        <Text style={styles.statLabel}>Members</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search clubs..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchbar}
      />

      <FlatList
        data={clubs}
        keyExtractor={(item) => item.id}
        renderItem={renderClub}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={clubs.length === 0 ? styles.emptyContainer : styles.list}
        ListEmptyComponent={
          <EmptyState title="No clubs found" subtitle="Be the first to start a club!" />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchbar: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: colors.surface,
    elevation: 1,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  clubIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clubIconText: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textOnPrimary,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  clubName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  clubLocation: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  clubDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  cardStats: {
    alignItems: 'center',
    marginLeft: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
});
