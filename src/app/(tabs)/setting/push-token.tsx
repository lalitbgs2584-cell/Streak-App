import React from 'react';
import { Alert, ScrollView, Share, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Copy, BellRing } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/lib/theme';
import { useToken } from '@/lib/context/Token.context';
import { useHabits } from '@/lib/hooks/use-habits';

export default function PushTokenScreen() {
  const router = useRouter();
  const { token } = useToken();
  const { profile } = useHabits();

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} activeOpacity={0.85}>
            <ChevronLeft size={22} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Push Token</Text>
          <View style={styles.iconButton} />
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Enable push notifications</Text>
            <View style={[styles.switchTrack, profile?.notificationPermission ? null : styles.switchTrackOff]}>
              <View style={[styles.switchThumb, profile?.notificationPermission ? null : styles.switchThumbOff]} />
            </View>
          </View>

          <Text style={styles.sectionLabel}>Expo push token</Text>
          <View style={styles.tokenWrap}>
            <TextInput
              value={token ?? 'Register on a physical device to fetch your Expo push token.'}
              editable={false}
              style={styles.tokenInput}
              selectTextOnFocus
            />
          </View>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.85}
            onPress={async () => {
              if (!token) {
                Alert.alert('Push Token', 'Register on a physical device to generate a token.');
                return;
              }
              await Share.share({ message: token });
            }}
          >
            <Copy size={16} color={theme.colors.accent.DEFAULT} />
            <Text style={styles.secondaryButtonText}>Copy Token</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.noteCard}>
          <BellRing size={18} color={theme.colors.accent.DEFAULT} />
          <View style={styles.noteCopy}>
            <Text style={styles.noteTitle}>Foreground and background push states</Text>
            <Text style={styles.noteText}>
              This screen is designed to show token and notification behavior without wiring the server side yet.
            </Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.base,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface.card,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  card: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  rowLabel: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    flex: 1,
  },
  switchTrack: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.accent.DEFAULT,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  switchTrackOff: {
    backgroundColor: theme.colors.surface.border,
    alignItems: 'flex-start',
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  switchThumbOff: {
    backgroundColor: '#D1D5DB',
  },
  sectionLabel: {
    ...theme.typography.overline,
    color: theme.colors.text.tertiary,
  },
  tokenWrap: {
    minHeight: 52,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    backgroundColor: theme.colors.surface.input,
    paddingHorizontal: theme.spacing.md,
    justifyContent: 'center',
  },
  tokenInput: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
  },
  secondaryButton: {
    height: 48,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.accent.DEFAULT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.accent.DEFAULT,
  },
  noteCard: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  noteCopy: {
    flex: 1,
    gap: 4,
  },
  noteTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
  },
  noteText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
});
