import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { OpponentSearch } from '../../components/match/OpponentSearch';
import { useCreateMatch } from '../../hooks/useMatches';
import { colors } from '../../theme';

interface Props {
  navigation: any;
  route: any;
}

export function RecordMatchScreen({ navigation, route }: Props) {
  const preselectedOpponent = route.params?.opponentId
    ? { id: route.params.opponentId, name: route.params.opponentName || '' }
    : null;

  const [opponent, setOpponent] = useState<any>(preselectedOpponent);
  const [myScore, setMyScore] = useState('');
  const [oppScore, setOppScore] = useState('');
  const [venue, setVenue] = useState('');
  const [matchType, setMatchType] = useState('SINGLES');
  const [notes, setNotes] = useState('');
  const createMatch = useCreateMatch();

  const handleSubmit = async () => {
    if (!opponent) {
      Alert.alert('Error', 'Please select an opponent');
      return;
    }
    if (!myScore || !oppScore) {
      Alert.alert('Error', 'Please enter scores');
      return;
    }

    try {
      await createMatch.mutateAsync({
        opponentId: opponent.id,
        player1Score: parseInt(myScore),
        player2Score: parseInt(oppScore),
        matchType,
        venue: venue || undefined,
        playedAt: new Date().toISOString(),
        notes: notes || undefined,
      });
      Alert.alert('Success', 'Match recorded! Waiting for opponent confirmation.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err: any) {
      Alert.alert('Error', err?.response?.data?.message || 'Failed to record match');
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.content}>
        <Text style={styles.title}>Record Match</Text>

        <Text style={styles.label}>Opponent</Text>
        <OpponentSearch onSelect={setOpponent} selectedUser={opponent} />

        <View style={styles.scoresRow}>
          <View style={styles.scoreCol}>
            <Text style={styles.label}>Your Score</Text>
            <TextInput
              value={myScore}
              onChangeText={(t) => setMyScore(t.replace(/[^0-9]/g, ''))}
              mode="outlined"
              keyboardType="number-pad"
              style={styles.scoreInput}
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
            />
          </View>
          <Text style={styles.vs}>vs</Text>
          <View style={styles.scoreCol}>
            <Text style={styles.label}>Opponent Score</Text>
            <TextInput
              value={oppScore}
              onChangeText={(t) => setOppScore(t.replace(/[^0-9]/g, ''))}
              mode="outlined"
              keyboardType="number-pad"
              style={styles.scoreInput}
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
            />
          </View>
        </View>

        <Text style={styles.label}>Match Type</Text>
        <SegmentedButtons
          value={matchType}
          onValueChange={setMatchType}
          buttons={[
            { value: 'SINGLES', label: 'Singles' },
            { value: 'DOUBLES', label: 'Doubles' },
            { value: 'PRACTICE', label: 'Practice' },
          ]}
          style={styles.segments}
        />

        <Text style={styles.label}>Venue (Optional)</Text>
        <TextInput
          value={venue}
          onChangeText={setVenue}
          mode="outlined"
          placeholder="e.g., Lake Town Club"
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
        />

        <Text style={styles.label}>Notes (Optional)</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          mode="outlined"
          multiline
          numberOfLines={3}
          placeholder="Match notes..."
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={createMatch.isPending}
          disabled={!opponent || !myScore || !oppScore || createMatch.isPending}
          style={styles.submitButton}
          buttonColor={colors.primary}
        >
          Submit Match
        </Button>
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
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
    marginBottom: 4,
  },
  scoresRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  scoreCol: {
    flex: 1,
  },
  scoreInput: {
    backgroundColor: colors.surface,
    textAlign: 'center',
    fontSize: 24,
  },
  vs: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 12,
  },
  segments: {
    marginTop: 4,
  },
  input: {
    backgroundColor: colors.surface,
  },
  submitButton: {
    marginTop: 24,
    paddingVertical: 4,
    borderRadius: 8,
  },
});
