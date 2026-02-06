import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { colors } from '../../theme';

export function PlayScreen() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Text style={styles.title}>Virtual Carrom</Text>
          <Text style={styles.subtitle}>Coming Soon!</Text>
          <Text style={styles.description}>
            Practice against AI opponents, play online with friends, and compete in virtual
            tournaments. Stay tuned for updates!
          </Text>
          <View style={styles.features}>
            <Text style={styles.feature}>- Practice Mode (vs AI)</Text>
            <Text style={styles.feature}>- Online Multiplayer</Text>
            <Text style={styles.feature}>- Virtual Tournaments</Text>
            <Text style={styles.feature}>- Customizable Boards & Strikers</Text>
          </View>
          <Button mode="outlined" style={styles.button} disabled>
            Notify Me
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: colors.surface,
  },
  content: {
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.secondary,
    marginTop: 8,
  },
  description: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 22,
  },
  features: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 20,
  },
  feature: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 6,
  },
  button: {
    borderRadius: 8,
  },
});
