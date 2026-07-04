/**
 * app/(tabs)/settings.tsx
 * WHY a config array instead of writing 7 <SettingsRow> tags by hand:
 * When you (or a designer) says "add a Backup & Restore row," you add one
 * object here — you never touch layout/spacing code again. It also makes
 * this file readable as a SPEC of your settings screen, not a maze of JSX.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Bell, Clock, Volume2, Moon, Globe, Info, HelpCircle, LucideIcon,
} from 'lucide-react-native';
import { SettingsRow } from '@/components/ui/Setting/SettingsRow';
import { SettingsSection } from '@/components/ui/Setting/SettingSection';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/lib/theme';

type RowConfig = {
  icon: LucideIcon;
  label: string;
  value?: string;
  valueColor?: string;
  route: string; // path this row navigates to
};

type SectionConfig = { title: string; rows: RowConfig[] };

const SECTIONS: SectionConfig[] = [
  {
    title: 'Notifications',
    rows: [
      { icon: Bell, label: 'Notification Permission', value: 'Granted', valueColor: theme.colors.accent.DEFAULT, route: '/setting/notification-permission' },
      { icon: Clock, label: 'Quiet Hours', value: '10:00 PM - 07:00 AM', route: '/setting/quiet-hours' },
      { icon: Volume2, label: 'Notification Sound', value: 'Default', route: '/setting/notification-sound' },
    ],
  },
  {
    title: 'Preferences',
    rows: [
      { icon: Globe, label: 'Language', value: 'English', route: '/setting/language' },
    ],
  },
  {
    title: 'More',
    rows: [
      { icon: Info, label: 'About App', route: '/setting/about' },
      { icon: HelpCircle, label: 'Help & Support', route: '/setting/help-support' },
    ],
  },
];

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <Screen scroll>
      <Text style={styles.title}>Settings</Text>

      {SECTIONS.map((section) => (
        <SettingsSection key={section.title} title={section.title}>
          {section.rows.map((row, index) => (
            <SettingsRow
              key={row.label}
              icon={row.icon}
              label={row.label}
              value={row.value}
              valueColor={row.valueColor}
              isLast={index === section.rows.length - 1}
              onPress={() => router.push(row.route as any)}
            />
          ))}
        </SettingsSection>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...theme.typography.title,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },
});