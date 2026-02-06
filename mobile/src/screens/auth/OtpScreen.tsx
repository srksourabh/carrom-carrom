import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useVerifyOtp } from '../../hooks/useAuth';
import { colors } from '../../theme';

interface Props {
  navigation: any;
  route: any;
}

export function OtpScreen({ navigation, route }: Props) {
  const { email } = route.params;
  const [otp, setOtp] = useState('');
  const verifyOtp = useVerifyOtp();

  const handleVerify = async () => {
    if (otp.length !== 6) return;
    try {
      await verifyOtp.mutateAsync({ email, otp });
      // Navigation handled by auth state change in RootNavigator
    } catch (err: any) {
      // Error handled by mutation
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>We sent a code to {email}</Text>

        <TextInput
          label="6-digit OTP"
          value={otp}
          onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, '').slice(0, 6))}
          mode="outlined"
          keyboardType="number-pad"
          maxLength={6}
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
        />

        <Button
          mode="contained"
          onPress={handleVerify}
          loading={verifyOtp.isPending}
          disabled={otp.length !== 6 || verifyOtp.isPending}
          style={styles.button}
          buttonColor={colors.primary}
        >
          Verify & Login
        </Button>

        {verifyOtp.isError && (
          <Text style={styles.error}>
            {(verifyOtp.error as any)?.response?.data?.message || 'Invalid OTP'}
          </Text>
        )}

        <Button
          mode="text"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          Change email
        </Button>

        <Text style={styles.hint}>Demo OTP: 123456</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 8,
  },
  button: {
    paddingVertical: 4,
    borderRadius: 8,
  },
  error: {
    color: colors.error,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 8,
  },
  hint: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 16,
  },
});
