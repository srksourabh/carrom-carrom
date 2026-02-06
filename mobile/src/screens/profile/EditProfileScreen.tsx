import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useMyProfile, useUpdateProfile } from '../../hooks/useUser';
import { useAuthStore } from '../../stores/authStore';
import { colors } from '../../theme';

const DISTRICTS = [
  'Kolkata', 'Howrah', 'Hooghly', 'North 24 Parganas', 'South 24 Parganas',
  'Burdwan', 'Siliguri', 'Durgapur', 'Darjeeling', 'Malda', 'Murshidabad',
  'Nadia', 'Purulia', 'Bankura', 'Birbhum',
];

interface Props {
  navigation: any;
}

export function EditProfileScreen({ navigation }: Props) {
  const { data: profile, isLoading } = useMyProfile();
  const updateProfile = useUpdateProfile();
  const setUser = useAuthStore((s) => s.setUser);

  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setDisplayName(profile.displayName || '');
      setBio(profile.bio || '');
      setDistrict(profile.district || '');
      setCity(profile.city || '');
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      const updated = await updateProfile.mutateAsync({
        name: name.trim(),
        displayName: displayName.trim() || undefined,
        bio: bio.trim() || undefined,
        district: district.trim() || undefined,
        city: city.trim() || undefined,
      });
      setUser({
        ...useAuthStore.getState().user!,
        name: updated.name,
        displayName: updated.displayName,
      });
      Alert.alert('Success', 'Profile updated!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err: any) {
      Alert.alert('Error', err?.response?.data?.message || 'Failed to update profile');
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Edit Profile</Text>

        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
        />

        <Text style={styles.label}>Display Name</Text>
        <TextInput
          value={displayName}
          onChangeText={setDisplayName}
          mode="outlined"
          placeholder="Nickname or short name"
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
        />

        <Text style={styles.label}>Bio</Text>
        <TextInput
          value={bio}
          onChangeText={setBio}
          mode="outlined"
          multiline
          numberOfLines={3}
          placeholder="Tell us about yourself..."
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
        />

        <Text style={styles.label}>District</Text>
        <TextInput
          value={district}
          onChangeText={setDistrict}
          mode="outlined"
          placeholder="e.g., Kolkata, Howrah"
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
        />

        <Text style={styles.label}>City</Text>
        <TextInput
          value={city}
          onChangeText={setCity}
          mode="outlined"
          placeholder="Your city"
          style={styles.input}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
        />

        <Button
          mode="contained"
          onPress={handleSave}
          loading={updateProfile.isPending}
          disabled={!name.trim() || updateProfile.isPending}
          style={styles.saveButton}
          buttonColor={colors.primary}
        >
          Save Profile
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
  input: {
    backgroundColor: colors.surface,
  },
  saveButton: {
    marginTop: 24,
    paddingVertical: 4,
    borderRadius: 8,
  },
});
