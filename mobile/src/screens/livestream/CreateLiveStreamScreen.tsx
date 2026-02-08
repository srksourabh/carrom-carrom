import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useCreateLiveStream } from '../../hooks/useLiveStreams';
import { colors } from '../../theme';

interface Props {
  navigation: any;
}

export function CreateLiveStreamScreen({ navigation }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const createStream = useCreateLiveStream();

  const handleCreate = async () => {
    if (!title.trim() || !streamUrl.trim()) {
      Alert.alert('Error', 'Title and stream URL are required');
      return;
    }

    try {
      const stream = await createStream.mutateAsync({
        title: title.trim(),
        description: description.trim() || undefined,
        streamUrl: streamUrl.trim(),
      });
      navigation.replace('LiveStreamDetail', { streamId: stream.id });
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message || 'Failed to create stream');
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.form}>
        <Text style={styles.heading}>Go Live</Text>
        <Text style={styles.subtitle}>Share your carrom game with the community</Text>

        <TextInput
          mode="outlined"
          label="Stream Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          maxLength={200}
          placeholder="e.g., Practice session - singles"
        />

        <TextInput
          mode="outlined"
          label="Stream URL"
          value={streamUrl}
          onChangeText={setStreamUrl}
          style={styles.input}
          placeholder="https://youtube.com/live/..."
          keyboardType="url"
          autoCapitalize="none"
        />

        <TextInput
          mode="outlined"
          label="Description (optional)"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          multiline
          numberOfLines={3}
          maxLength={2000}
          placeholder="Tell viewers what to expect..."
        />

        <Button
          mode="contained"
          onPress={handleCreate}
          style={styles.button}
          buttonColor={colors.error}
          textColor={colors.textOnPrimary}
          loading={createStream.isPending}
          disabled={!title.trim() || !streamUrl.trim()}
        >
          Start Streaming
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
  form: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: colors.surface,
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
    paddingVertical: 4,
  },
});
