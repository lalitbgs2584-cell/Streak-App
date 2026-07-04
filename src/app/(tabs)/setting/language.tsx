import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Check, ChevronLeft, Globe2 } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/lib/theme';

export default function LanguageScreen() {
  const router = useRouter();

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} activeOpacity={0.85}>
            <ChevronLeft size={22} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Language</Text>
          <View style={styles.iconButton} />
        </View>

        <View style={styles.hero}>
          <Globe2 size={26} color={theme.colors.accent.DEFAULT} />
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>English</Text>
            <Text style={styles.heroText}>Primary app language and fallback locale.</Text>
          </View>
        </View>

        <View style={styles.card}>
          {['English', 'Hindi', 'Spanish'].map((option, index) => {
            const active = index === 0;
            return (
              <View key={option} style={styles.optionRow}>
                <Text style={[styles.optionText, active && styles.optionTextActive]}>{option}</Text>
                {active ? <Check size={16} color={theme.colors.accent.DEFAULT} /> : null}
              </View>
            );
          })}
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  heroCopy: {
    flex: 1,
    gap: 4,
  },
  heroTitle: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  heroText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  card: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    overflow: 'hidden',
  },
  optionRow: {
    minHeight: 52,
    paddingHorizontal: theme.spacing.base,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.surface.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  optionTextActive: {
    color: theme.colors.text.primary,
  },
});
