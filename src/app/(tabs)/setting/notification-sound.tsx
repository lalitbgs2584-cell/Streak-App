import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/lib/theme';

export default function PushTokenScreen() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(true);
  const token = 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]';

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
        <Text style={styles.headerTitle}>Push Notifications</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Toggle Option */}
        <View style={styles.menuRow}>
          <Text style={styles.menuLabel}>Enable Push Notifications</Text>
          <TouchableOpacity
            style={[
              styles.switchTrack,
              enabled ? { backgroundColor: theme.colors.accent.DEFAULT } : { backgroundColor: theme.colors.surface.border }
            ]}
            onPress={() => setEnabled(!enabled)}
            activeOpacity={0.8}
          >
            <View style={[styles.switchThumb, enabled ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }]} />
          </TouchableOpacity>
        </View>

        {/* Push Token Container */}
        {enabled && (
          <View style={styles.tokenContainer}>
            <Text style={styles.sectionLabel}>Your Expo Push Token</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.tokenInput}
                value={token}
                editable={false}
                selectTextOnFocus
              />
            </View>
            <TouchableOpacity style={styles.copyButton} activeOpacity={0.8}>
              <Text style={styles.copyButtonText}>Copy Token</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Description Section */}
        <View style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>About Push Notifications</Text>
          <Text style={styles.aboutText}>
            We only use push notifications for habit reminders, streak nudges and important updates.
          </Text>
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
    paddingHorizontal: 20,
    paddingTop: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  switchTrack: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  tokenContainer: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: theme.spacing.md,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    backgroundColor: theme.colors.surface.input,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    paddingHorizontal: theme.spacing.md,
    height: 52,
    justifyContent: 'center',
  },
  tokenInput: {
    color: theme.colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  copyButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.accent.DEFAULT,
    height: 48,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.accent.DEFAULT,
  },
  aboutCard: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: theme.spacing.xs,
  },
  aboutTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  aboutText: {
    fontSize: 14,
    color: theme.colors.text.primary,
    lineHeight: 20,
    fontWeight: '500',
  },
});
