import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, CircleHelp, MessageCircleMore, ShieldCheck } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/lib/theme';

export default function HelpSupportScreen() {
  const router = useRouter();

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} activeOpacity={0.85}>
            <ChevronLeft size={22} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Help & Support</Text>
          <View style={styles.iconButton} />
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <CircleHelp size={18} color={theme.colors.accent.DEFAULT} />
            <Text style={styles.rowText}>How reminders, streaks, and routes fit together</Text>
          </View>
          <View style={styles.row}>
            <MessageCircleMore size={18} color={theme.colors.accent.DEFAULT} />
            <Text style={styles.rowText}>Common questions and user-facing troubleshooting</Text>
          </View>
          <View style={styles.row}>
            <ShieldCheck size={18} color={theme.colors.accent.DEFAULT} />
            <Text style={styles.rowText}>Permission and privacy guidance for notification setup</Text>
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
    gap: theme.spacing.sm,
  },
  rowText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    flex: 1,
  },
});
