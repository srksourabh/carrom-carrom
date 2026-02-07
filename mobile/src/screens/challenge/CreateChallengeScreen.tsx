import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { OpponentSearch } from '../../components/match/OpponentSearch';
import { useCreateChallenge } from '../../hooks/useChallenges';
import { colors } from '../../theme';

interface Props {
  navigation: any;
  route: any;
}

export function CreateChallengeScreen({ navigation, route }: Props) {
  const preselectedUser = route.params?.opponent || null;
  const [opponent, setOpponent] = useState<any>(preselectedUser);
  const [message, setMessage] = useState('');
  const [venue, setVenue] = useState('');
  const [proposedDate, setProposedDate] = useState('');
  const createChallenge = useCreateChallenge();

  const handleSend = async () => {
    if (!opponent) {
      Alert.alert('Error', 'Please select an opponent');
      return;
    }

    try {
      await createChallenge.mutateAsync({
        receiverId: opponent.id,
        message: message.trim() || undefined,
        proposedVenue: venue.trim() || undefined,
        proposedDate: proposedDate.trim() || undefined,
      });
      Alert.alert('Challenge Sent!', `Your challenge has been sent to ${opponent.displayName || opponent.name}.`);
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Error', err?.response?.data?.message || 'Failed to send challenge');
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Challenge a Player</Text>
        <Text style={styles.sectionSubtitle}>
          Send a challenge to compete in a carrom match
        </Text>

        <View style={styles.section}>
          <Text style={styles.label}>Opponent</Text>
          <OpponentSearch onSelect={setOpponent} selectedUser={opponent} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Message (optional)</Text>
          <TextInput
            mode="outlined"
            placeholder="e.g. Ready for a rematch?"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={3}
            maxLength={500}
            style={styles.input}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Proposed Venue (optional)</Text>
          <TextInput
            mode="outlined"
            placeholder="e.g. Lake Town Club, Kolkata"
            value={venue}
            onChangeText={setVenue}
            maxLength={255}
            style={styles.input}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Proposed Date (optional)</Text>
          <TextInput
            mode="outlined"
            placeholder="e.g. 2026-02-15T18:00:00Z"
            value={proposedDate}
            onChangeText={setProposedDate}
            style={styles.input}
          />
          <Text style={styles.hint}>Use ISO format: YYYY-MM-DDTHH:mm:ssZ</Text>
        </View>

        <Button
          mode="contained"
          onPress={handleSend}
          loading={createChallenge.isPending}
          disabled={!opponent || createChallenge.isPending}
          style={styles.submitButton}
          buttonColor={colors.secondary}
        >
          Send Challenge
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
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
  },
  hint: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
  submitButton: {
    marginTop: 8,
    paddingVertical: 4,
  },
});
