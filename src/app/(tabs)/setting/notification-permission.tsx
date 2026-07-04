import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, BellOff } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/lib/theme';

export default function NotificationPermissionScreen() {
  const router = useRouter();

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeft size={28} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Permission Denied</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Visual Callout */}
        <View style={styles.centerSection}>
          <View style={styles.alertCircle}>
            <BellOff size={54} color={theme.colors.text.secondary} />
          </View>
          <Text style={styles.alertTitle}>Permission Denied</Text>
          <Text style={styles.alertSubtitle}>
            We need notification permission to remind you about your habits.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.openSettingsButton}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Open Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={styles.notNowLink}>
            <Text style={styles.notNowText}>Not Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  backButton: {
    padding: theme.spacing.xs,
    marginLeft: -theme.spacing.xs,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.text.primary,
  },
  headerPlaceholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: theme.spacing.xxxl,
  },
  centerSection: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
  },
  alertCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255,255,255,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.surface.border,
    marginBottom: theme.spacing.xxl,
  },
  alertTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  alertSubtitle: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  buttonContainer: {
    gap: theme.spacing.md,
  },
  openSettingsButton: {
    backgroundColor: theme.colors.accent.DEFAULT,
    height: 52,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.accent.text,
  },
  notNowLink: {
    alignSelf: 'center',
    paddingVertical: theme.spacing.xs,
  },
  notNowText: {
    color: theme.colors.text.secondary,
    fontSize: 15,
    fontWeight: '700',
  },
});
