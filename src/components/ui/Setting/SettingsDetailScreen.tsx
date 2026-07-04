/**
 * SettingsDetailScreen.tsx
 * WHY: every one of the 7 detail pages needs the same header (back arrow +
 * title). Without this wrapper you'd paste that header into 7 files and
 * eventually they'd drift (different spacing, missed back button, etc).
 * Now every detail screen is: <SettingsDetailScreen title="X"> + its
 * unique content.
 */
import React, { PropsWithChildren } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { theme } from '@/lib/theme';
import { Screen } from '@/components/layout/Screen';


export function SettingsDetailScreen({ title, children }: PropsWithChildren<{ title: string }>) {
  const router = useRouter();
  return (
    <Screen scroll>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={22} color={theme.colors.text.primary} />
        </Pressable>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.backButton} /> {/* spacer to keep title centered */}
      </View>
      <View style={styles.content}>{children}</View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing.sm,
  },
  backButton: {
    width: 36, height: 36, borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface.card,
    alignItems: 'center', justifyContent: 'center',
  },
  title: { ...theme.typography.heading, color: theme.colors.text.primary },
  content: { marginTop: theme.spacing.xl },
});