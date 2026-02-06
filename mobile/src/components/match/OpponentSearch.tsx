import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { Avatar } from '../common/Avatar';
import { useSearchUsers } from '../../hooks/useUser';
import { colors } from '../../theme';

interface Props {
  onSelect: (user: any) => void;
  selectedUser?: any;
}

export function OpponentSearch({ onSelect, selectedUser }: Props) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { data: users } = useSearchUsers(query);

  const handleSelect = useCallback((user: any) => {
    onSelect(user);
    setQuery(user.name);
    setShowResults(false);
  }, [onSelect]);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search opponent by name..."
        value={selectedUser ? selectedUser.name : query}
        onChangeText={(text) => {
          setQuery(text);
          setShowResults(true);
          if (selectedUser) onSelect(null);
        }}
        onFocus={() => setShowResults(true)}
        style={styles.searchbar}
      />
      {showResults && users && users.length > 0 && (
        <View style={styles.results}>
          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
                <Avatar uri={item.avatarUrl} name={item.name} size={32} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemMeta}>
                    ELO: {item.eloRating} | {item.district || 'West Bengal'}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
  searchbar: {
    backgroundColor: colors.surface,
    elevation: 1,
  },
  results: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    maxHeight: 200,
    elevation: 4,
    marginTop: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  itemInfo: {
    marginLeft: 10,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
  },
  itemMeta: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
