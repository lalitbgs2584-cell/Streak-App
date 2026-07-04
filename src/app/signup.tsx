import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, User, Globe, Shield } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { SETTINGS_PROFILE } from '@/lib/mock/habit-ui';
import { theme } from '@/lib/theme';

export default function SignupScreen() {
  const router = useRouter();

  return (
    <Screen keyboardAvoiding padded={false} edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile Setup</Text>
          <Text style={styles.subtitle}>This replaces the old login flow for now.</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.field}>
            <User size={18} color={theme.colors.text.tertiary} />
            <TextInput
              defaultValue={SETTINGS_PROFILE.name}
              placeholder="Name"
              placeholderTextColor={theme.colors.text.tertiary}
              style={styles.input}
            />
          </View>
          <View style={styles.field}>
            <Mail size={18} color={theme.colors.text.tertiary} />
            <TextInput
              defaultValue={SETTINGS_PROFILE.email}
              placeholder="Email"
              placeholderTextColor={theme.colors.text.tertiary}
              style={styles.input}
            />
          </View>
          <View style={styles.field}>
            <Globe size={18} color={theme.colors.text.tertiary} />
            <TextInput
              defaultValue={SETTINGS_PROFILE.timeZone}
              placeholder="Time zone"
              placeholderTextColor={theme.colors.text.tertiary}
              style={styles.input}
            />
          </View>
          <View style={styles.field}>
            <Shield size={18} color={theme.colors.text.tertiary} />
            <TextInput
              placeholder="Password"
              placeholderTextColor={theme.colors.text.tertiary}
              secureTextEntry
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>No authentication wiring</Text>
          <Text style={styles.noteText}>
            These inputs are purely visual and can later be connected to the real user profile record.
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={() => router.replace('/(tabs)/today')}>
          <Text style={styles.primaryButtonText}>Continue</Text>
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
    gap: 6,
    paddingTop: theme.spacing.sm,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.text.primary,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  card: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: theme.spacing.sm,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    minHeight: 52,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    backgroundColor: theme.colors.surface.input,
    paddingHorizontal: theme.spacing.md,
  },
  input: {
    flex: 1,
    color: theme.colors.text.primary,
    ...theme.typography.bodyMedium,
  },
  noteCard: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: 6,
  },
  noteTitle: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  noteText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
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
});
