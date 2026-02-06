import React from 'react';
import { Avatar as PaperAvatar } from 'react-native-paper';
import { colors } from '../../theme';

interface Props {
  uri?: string | null;
  name: string;
  size?: number;
}

export function Avatar({ uri, name, size = 48 }: Props) {
  if (uri) {
    return <PaperAvatar.Image size={size} source={{ uri }} />;
  }

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <PaperAvatar.Text
      size={size}
      label={initials}
      style={{ backgroundColor: colors.primary }}
      labelStyle={{ color: colors.textOnPrimary }}
    />
  );
}
