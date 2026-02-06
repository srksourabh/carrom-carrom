import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { MatchCard } from '../../components/match/MatchCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { useMatches } from '../../hooks/useMatches';
import { useAuthStore } from '../../stores/authStore';
import { colors } from '../../theme';

interface Props {
  navigation: any;
}

export function MatchHistoryScreen({ navigation }: Props) {
  const user = useAuthStore((s) => s.user);
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useMatches(page);

  if (isLoading) return <LoadingSpinner />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.matches || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MatchCard
            match={item}
            currentUserId={user?.id || ''}
            onPress={() => navigation.navigate('MatchDetail', { matchId: item.id })}
          />
        )}
        ListEmptyComponent={
          <EmptyState title="No matches yet" subtitle="Record your first match to see it here" />
        }
        ListHeaderComponent={
          <Text style={styles.header}>Match History</Text>
        }
        onEndReached={() => {
          if (data && page * 20 < data.total) {
            setPage((p) => p + 1);
          }
        }}
        onEndReachedThreshold={0.5}
        refreshing={false}
        onRefresh={refetch}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
});
