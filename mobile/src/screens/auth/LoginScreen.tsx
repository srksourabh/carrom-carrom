import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useSendOtp } from '../../hooks/useAuth';
import { CarromBoardHero } from '../../components/CarromBoardHero';
import { colors } from '../../theme';

interface Props {
  navigation: any;
}

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const sendOtp = useSendOtp();

  const handleSendOtp = async () => {
    if (!email.trim()) return;
    try {
      await sendOtp.mutateAsync(email.trim().toLowerCase());
      navigation.navigate('Otp', { email: email.trim().toLowerCase() });
    } catch (err: any) {
      // Error handled by mutation
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Hero: Carrom Board with liquid hover animation */}
          <CarromBoardHero />

          <View style={styles.header}>
            <Text style={styles.logo}>Carrom Carrom</Text>
            <Text style={styles.subtitle}>West Bengal's Carrom Community</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.welcomeText}>Welcome! Sign in to continue</Text>
            <TextInput
              label="Email address"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              style={styles.input}
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
            />
            <Button
              mode="contained"
              onPress={handleSendOtp}
              loading={sendOtp.isPending}
              disabled={!email.trim() || sendOtp.isPending}
              style={styles.button}
              buttonColor={colors.primary}
            >
              Send OTP
            </Button>
            {sendOtp.isError && (
              <Text style={styles.error}>
                {(sendOtp.error as any)?.response?.data?.message || 'Failed to send OTP'}
              </Text>
            )}
          </View>

          <Text style={styles.hint}>
            For demo: use any email, OTP is 123456
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 36,
  },
  logo: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
  },
  form: {
    gap: 16,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
  },
  button: {
    paddingVertical: 4,
    borderRadius: 8,
  },
  error: {
    color: colors.error,
    textAlign: 'center',
  },
  hint: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 32,
  },
});
