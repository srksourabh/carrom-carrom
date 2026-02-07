import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { OpponentSearch } from '../../components/match/OpponentSearch';
import { useStartConversation } from '../../hooks/useChat';
import { colors } from '../../theme';

interface Props {
  navigation: any;
}

export function NewChatScreen({ navigation }: Props) {
  const [recipient, setRecipient] = useState<any>(null);
  const [message, setMessage] = useState('');
  const startConversation = useStartConversation();

  const handleSend = async () => {
    if (!recipient) {
      Alert.alert('Error', 'Please select a recipient');
      return;
    }
    if (!message.trim()) {
      Alert.alert('Error', 'Please write a message');
      return;
    }

    try {
      const result = await startConversation.mutateAsync({
        participantId: recipient.id,
        message: message.trim(),
      });
      // Navigate to the chat screen
      navigation.replace('Chat', {
        conversationId: result.conversation.id,
        otherUserName: recipient.displayName || recipient.name,
      });
    } catch (err: any) {
      Alert.alert('Error', err?.response?.data?.message || 'Failed to start conversation');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>New Message</Text>

        <View style={styles.section}>
          <Text style={styles.label}>To</Text>
          <OpponentSearch onSelect={setRecipient} selectedUser={recipient} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Message</Text>
          <TextInput
            mode="outlined"
            placeholder="Type your message..."
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            maxLength={2000}
            style={styles.input}
          />
        </View>

        <Button
          mode="contained"
          onPress={handleSend}
          loading={startConversation.isPending}
          disabled={!recipient || !message.trim() || startConversation.isPending}
          style={styles.sendButton}
          buttonColor={colors.primary}
        >
          Send Message
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
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
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
  sendButton: {
    marginTop: 8,
    paddingVertical: 4,
  },
});
