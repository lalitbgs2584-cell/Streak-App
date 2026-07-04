import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Moon, Shield, Smartphone } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/lib/theme';

export default function PreferencesScreen() {
  const router = useRouter();

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} activeOpacity={0.85}>
            <ChevronLeft size={22} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Preferences</Text>
          <View style={styles.iconButton} />
        </View>

        <View style={styles.card}>
          <View style={styles.optionRow}>
            <Moon size={18} color={theme.colors.accent.DEFAULT} />
            <View style={styles.optionCopy}>
              <Text style={styles.optionTitle}>Theme</Text>
              <Text style={styles.optionText}>Dark mode by default with neon accent</Text>
            </View>
          </View>
          <View style={styles.optionRow}>
            <Smartphone size={18} color={theme.colors.accent.DEFAULT} />
            <View style={styles.optionCopy}>
              <Text style={styles.optionTitle}>Vibration</Text>
              <Text style={styles.optionText}>Haptic feedback for reminder interactions</Text>
            </View>
          </View>
          <View style={styles.optionRow}>
            <Shield size={18} color={theme.colors.accent.DEFAULT} />
            <View style={styles.optionCopy}>
              <Text style={styles.optionTitle}>Badges</Text>
              <Text style={styles.optionText}>Show pending habit counts on the app icon</Text>
            </View>
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
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: 6,
  },
  optionCopy: {
    flex: 1,
    gap: 4,
  },
  optionTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
  },
  optionText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
});
