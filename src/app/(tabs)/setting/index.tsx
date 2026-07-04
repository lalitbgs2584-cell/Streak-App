import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Bell,
  Clock,
  Globe,
  HelpCircle,
  Info,
  Lock,
  Mail,
  Moon,
  User,
  Volume2,
} from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { ListRow, SETTINGS_PROFILE } from '@/lib/mock/habit-ui';
import { theme } from '@/lib/theme';
import { useHabits } from '@/lib/hooks/use-habits';
import { useToken } from '@/lib/context/Token.context';

export default function SettingsScreen() {
  const router = useRouter();
  const { profile } = useHabits();
  const { token } = useToken();

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.85} onPress={() => router.push('/(tabs)/setting/profile')}>
            <User size={18} color={theme.colors.text.primary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.profileCard} activeOpacity={0.85} onPress={() => router.push('/(tabs)/setting/profile')}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(profile?.name ?? SETTINGS_PROFILE.name).slice(0, 1)}</Text>
          </View>
          <View style={styles.profileCopy}>
            <Text style={styles.profileName}>{profile?.name ?? SETTINGS_PROFILE.name}</Text>
            <Text style={styles.profileMeta}>{profile?.email ?? SETTINGS_PROFILE.email}</Text>
          </View>
          <Text style={styles.profileLink}>Edit</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Notifications</Text>
          <View style={styles.sectionCard}>
            <ListRow label="Notification Permission" value={profile?.notificationPermission ? 'Granted' : 'Denied'} valueColor={profile?.notificationPermission ? theme.colors.accent.DEFAULT : theme.colors.status.error} onPress={() => router.push('/(tabs)/setting/notification-permission')} rightIcon={<Bell size={18} color={theme.colors.text.tertiary} />} />
            <ListRow label="Push Token" value={token ? 'Available' : 'Not registered'} onPress={() => router.push('/(tabs)/setting/push-token')} rightIcon={<Mail size={18} color={theme.colors.text.tertiary} />} />
            <ListRow label="Quiet Hours" value="10:00 PM - 07:00 AM" onPress={() => router.push('/(tabs)/setting/quiet-hours')} rightIcon={<Clock size={18} color={theme.colors.text.tertiary} />} />
            <ListRow label="Notification Sound" value="Default" onPress={() => router.push('/(tabs)/setting/notification-sound')} rightIcon={<Volume2 size={18} color={theme.colors.text.tertiary} />} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Profile</Text>
          <View style={styles.sectionCard}>
            <ListRow label="Name" value={profile?.name ?? SETTINGS_PROFILE.name} onPress={() => router.push('/(tabs)/setting/profile')} rightIcon={<User size={18} color={theme.colors.text.tertiary} />} />
            <ListRow label="Language" value={profile?.language ?? SETTINGS_PROFILE.language} onPress={() => router.push('/(tabs)/setting/language')} rightIcon={<Globe size={18} color={theme.colors.text.tertiary} />} />
            <ListRow label="Preferences" value="Theme, vibration, badges" onPress={() => router.push('/(tabs)/setting/preferences')} rightIcon={<Moon size={18} color={theme.colors.text.tertiary} />} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>More</Text>
          <View style={styles.sectionCard}>
            <ListRow label="About App" value="Version 1.0.0" onPress={() => router.push('/(tabs)/setting/about')} rightIcon={<Info size={18} color={theme.colors.text.tertiary} />} />
            <ListRow label="Help & Support" value="FAQs and tips" onPress={() => router.push('/(tabs)/setting/help-support')} rightIcon={<HelpCircle size={18} color={theme.colors.text.tertiary} />} />
            <ListRow label="Notification Privacy" value="How data is handled" onPress={() => router.push('/(tabs)/setting/notification-permission')} rightIcon={<Lock size={18} color={theme.colors.text.tertiary} />} />
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
  title: {
    ...theme.typography.title,
    color: theme.colors.text.primary,
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
  profileCard: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.accent.muted,
    borderWidth: 1,
    borderColor: theme.colors.accent.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...theme.typography.heading,
    color: theme.colors.accent.DEFAULT,
  },
  profileCopy: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  profileMeta: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  profileLink: {
    ...theme.typography.bodyMedium,
    color: theme.colors.accent.DEFAULT,
  },
  section: {
    gap: theme.spacing.sm,
  },
  sectionLabel: {
    ...theme.typography.overline,
    color: theme.colors.text.tertiary,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    overflow: 'hidden',
  },
});
