import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useCreatePost } from '../../hooks/useFeed';
import { colors } from '../../theme';

interface Props {
  navigation: any;
}

export function CreatePostScreen({ navigation }: Props) {
  const [content, setContent] = useState('');
  const createPost = useCreatePost();

  const handlePost = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please write something');
      return;
    }

    try {
      await createPost.mutateAsync({ content: content.trim() });
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Error', err?.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Share with the community</Text>
        <TextInput
          mode="outlined"
          placeholder="What's on your mind? Share your carrom experience..."
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={6}
          maxLength={2000}
          style={styles.input}
          autoFocus
        />
        <Text style={styles.charCount}>{content.length}/2000</Text>

        <Button
          mode="contained"
          onPress={handlePost}
          loading={createPost.isPending}
          disabled={!content.trim() || createPost.isPending}
          style={styles.postButton}
          buttonColor={colors.primary}
        >
          Post
        </Button>
      </View>
    </View>
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
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.surface,
    minHeight: 120,
  },
  charCount: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: 4,
  },
  postButton: {
    marginTop: 16,
    paddingVertical: 4,
  },
});
