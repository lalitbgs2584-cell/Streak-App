import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Mail, MapPin, User } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/lib/theme';
import { useHabits } from '@/lib/hooks/use-habits';

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, updateUserProfile } = useHabits();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [timeZone, setTimeZone] = React.useState('');

  React.useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setTimeZone(profile.timeZone);
    }
  }, [profile]);

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} activeOpacity={0.85}>
            <ChevronLeft size={22} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.iconButton} />
        </View>

        <View style={styles.avatarCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(profile?.name ?? 'Y').slice(0, 1)}</Text>
          </View>
          <Text style={styles.name}>{profile?.name ?? 'Your Name'}</Text>
          <Text style={styles.meta}>Profile details are loaded from the persisted user record.</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.field}>
            <User size={18} color={theme.colors.text.tertiary} />
            <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Name" placeholderTextColor={theme.colors.text.tertiary} />
          </View>
          <View style={styles.field}>
            <Mail size={18} color={theme.colors.text.tertiary} />
            <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Email" placeholderTextColor={theme.colors.text.tertiary} />
          </View>
          <View style={styles.field}>
            <MapPin size={18} color={theme.colors.text.tertiary} />
            <TextInput value={timeZone} onChangeText={setTimeZone} style={styles.input} placeholder="Time zone" placeholderTextColor={theme.colors.text.tertiary} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={async () => {
            await updateUserProfile({ name, email, timeZone });
            router.back();
          }}
        >
          <Text style={styles.primaryButtonText}>Save Profile</Text>
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
  avatarCard: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    alignItems: 'center',
    gap: 8,
    padding: theme.spacing.base,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: theme.colors.accent.muted,
    borderWidth: 1,
    borderColor: theme.colors.accent.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...theme.typography.title,
    color: theme.colors.accent.DEFAULT,
  },
  name: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  meta: {
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
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
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
