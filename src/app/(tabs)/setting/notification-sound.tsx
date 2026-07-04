import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Music4 } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/lib/theme';

export default function NotificationSoundScreen() {
  const router = useRouter();

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} activeOpacity={0.85}>
            <ChevronLeft size={22} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Notification Sound</Text>
          <View style={styles.iconButton} />
        </View>

        <View style={styles.card}>
          <View style={styles.soundRow}>
            <View style={styles.soundIcon}>
              <Music4 size={18} color={theme.colors.accent.DEFAULT} />
            </View>
            <View style={styles.soundCopy}>
              <Text style={styles.soundTitle}>Default</Text>
              <Text style={styles.soundText}>A simple reminder sound for habit alerts.</Text>
            </View>
          </View>

          <View style={styles.optionRow}>
            {['Default', 'Soft Chime', 'Pulse'].map((option, index) => (
              <View key={option} style={[styles.optionChip, index === 0 && styles.optionChipActive]}>
                <Text style={[styles.optionText, index === 0 && styles.optionTextActive]}>{option}</Text>
              </View>
            ))}
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
    gap: theme.spacing.base,
  },
  soundRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    alignItems: 'center',
  },
  soundIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: theme.colors.accent.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  soundCopy: {
    flex: 1,
    gap: 4,
  },
  soundTitle: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  soundText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionChip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: theme.colors.surface.cardElevated,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
  },
  optionChipActive: {
    backgroundColor: theme.colors.accent.muted,
    borderColor: theme.colors.accent.DEFAULT,
  },
  optionText: {
    ...theme.typography.label,
    color: theme.colors.text.secondary,
  },
  optionTextActive: {
    color: theme.colors.accent.DEFAULT,
  },
});
