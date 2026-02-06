import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Searchbar, SegmentedButtons, Text } from 'react-native-paper';
import { RankingRow } from '../../components/ranking/RankingRow';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { useRankings, useSearchRankings } from '../../hooks/useRankings';
import { colors } from '../../theme';

const DISTRICTS = [
  { value: '', label: 'All' },
  { value: 'Kolkata', label: 'Kolkata' },
  { value: 'Howrah', label: 'Howrah' },
  { value: 'Hooghly', label: 'Hooghly' },
];

interface Props {
  navigation: any;
}

export function RankingsScreen({ navigation }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [district, setDistrict] = useState('');
  const [page, setPage] = useState(1);

  const { data: rankings, isLoading } = useRankings(page, district || undefined);
  const { data: searchResults } = useSearchRankings(searchQuery);

  const displayData = searchQuery.length >= 2 ? searchResults : rankings?.data;

  const handlePlayerPress = (playerId: string) => {
    navigation.navigate('PlayerDetail', { userId: playerId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rankings</Text>
        <Searchbar
          placeholder="Search players..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchbar}
          inputStyle={styles.searchInput}
        />
      </View>

      <View style={styles.filters}>
        <SegmentedButtons
          value={district}
          onValueChange={setDistrict}
          buttons={DISTRICTS}
          style={styles.segments}
        />
      </View>

      {isLoading ? (
        <LoadingSpinner />
      ) : !displayData || displayData.length === 0 ? (
        <EmptyState title="No players found" subtitle="Try a different search or filter" />
      ) : (
        <FlatList
          data={displayData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RankingRow player={item} onPress={() => handlePlayerPress(item.id)} />
          )}
          onEndReached={() => {
            if (rankings && page < rankings.totalPages) {
              setPage((p) => p + 1);
            }
          }}
          onEndReachedThreshold={0.5}
        />
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
    padding: 16,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textOnPrimary,
    marginBottom: 12,
  },
  searchbar: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    elevation: 0,
    height: 44,
  },
  searchInput: {
    fontSize: 14,
  },
  filters: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  segments: {},
});
