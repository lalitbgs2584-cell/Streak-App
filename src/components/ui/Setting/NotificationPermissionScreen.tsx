import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/lib/theme';
import { PrimaryButton } from '../common/PrimaryButton';
import { SettingsDetailScreen } from './SettingsDetailScreen';


export default function NotificationPermissionScreen() {
  return (
    <SettingsDetailScreen title="Notification Permission">
      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Current status</Text>
        <Text style={styles.statusValue}>Granted</Text>
      </View>
      <Text style={styles.description}>
        Notifications let HabitTracker remind you at the right time for each
        habit. You can revoke this anytime from your device settings.
      </Text>
      <PrimaryButton onPress={() => {}}>Open System Settings</PrimaryButton>
    </SettingsDetailScreen>
  );
}

const styles = StyleSheet.create({
  statusCard: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.lg,
  },
  statusLabel: { ...theme.typography.caption, color: theme.colors.text.secondary },
  statusValue: { ...theme.typography.heading, color: theme.colors.accent.DEFAULT, marginTop: 4 },
  description: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl,
  },
});