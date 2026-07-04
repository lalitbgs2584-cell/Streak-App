import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Leaf } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/lib/theme';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} activeOpacity={0.85}>
            <ChevronLeft size={22} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>About</Text>
          <View style={styles.iconButton} />
        </View>

        <View style={styles.hero}>
          <View style={styles.logo}>
            <Leaf size={42} color={theme.colors.accent.DEFAULT} />
          </View>
          <Text style={styles.appName}>HabitTracker</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>What&apos;s new</Text>
          <Text style={styles.body}>
            Darker habit screens, route-ready settings pages, and a cleaner UI aligned to the database model.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Policy</Text>
          <Text style={styles.body}>Privacy Policy</Text>
          <Text style={styles.body}>Terms of Use</Text>
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
  hero: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    alignItems: 'center',
    gap: 6,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: theme.colors.accent.muted,
    borderWidth: 1,
    borderColor: theme.colors.accent.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  appVersion: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  card: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: 6,
  },
  sectionLabel: {
    ...theme.typography.overline,
    color: theme.colors.text.tertiary,
  },
  body: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
});
