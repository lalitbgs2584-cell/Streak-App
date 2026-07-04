import React from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BellOff, ChevronLeft, ShieldAlert } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/lib/theme';
import * as Notifications from 'expo-notifications';
import { useHabits } from '@/lib/hooks/use-habits';

export default function NotificationPermissionScreen() {
  const router = useRouter();
  const { profile, updateUserProfile } = useHabits();
  const [status, setStatus] = React.useState<'loading' | 'granted' | 'denied' | 'undetermined'>('loading');

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      const permissions = await Notifications.getPermissionsAsync();
      if (mounted) {
        setStatus(permissions.status);
      }
    };
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} activeOpacity={0.85}>
            <ChevronLeft size={22} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Permission Denied</Text>
          <View style={styles.iconButton} />
        </View>

        <View style={styles.heroCard}>
          <View style={styles.iconWrap}>
            <BellOff size={52} color={theme.colors.text.secondary} />
          </View>
          <Text style={styles.heroTitle}>
            {status === 'granted' ? 'Notification permission is on' : 'Notification permission is off'}
          </Text>
          <Text style={styles.heroText}>
            This UI reflects the live OS permission state and gives the user a safe route back to system settings.
          </Text>
        </View>

        <View style={styles.card}>
          <ShieldAlert size={18} color={theme.colors.accent.DEFAULT} />
          <Text style={styles.cardText}>
            Current status: {status}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={async () => {
            const result = await Notifications.requestPermissionsAsync();
            setStatus(result.status);
            await updateUserProfile({
              notificationPermission: result.status === 'granted',
            });
            if (result.status !== 'granted') {
              Alert.alert('Permission', 'Notifications are still disabled.');
            }
          }}
        >
          <Text style={styles.primaryButtonText}>Request Permission</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.85}
          onPress={() => {
            Linking.openSettings().catch(() => {
              Alert.alert('Open Settings', 'System settings could not be opened on this device.');
            });
          }}
        >
          <Text style={styles.secondaryButtonText}>Open Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85} onPress={() => router.back()}>
          <Text style={styles.secondaryButtonText}>Not Now</Text>
        </TouchableOpacity>
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
  heroCard: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    alignItems: 'center',
    gap: 8,
  },
  iconWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  heroText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  card: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    flex: 1,
  },
  primaryButton: {
    height: 52,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.accent.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.accent.text,
  },
  secondaryButton: {
    height: 48,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface.card,
  },
  secondaryButtonText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
  },
});
