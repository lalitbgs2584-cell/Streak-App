import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, Activity } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/lib/theme';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeft size={28} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Logo and titles */}
        <View style={styles.logoSection}>
          <View style={styles.logoBox}>
            <Activity size={48} color={theme.colors.accent.DEFAULT} />
          </View>
          <Text style={styles.appName}>HabitTracker</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
        </View>

        {/* Action Rows */}
        <View style={styles.rowsContainer}>
          {["What's New", 'Privacy Policy', 'Terms of Use'].map((item) => (
            <TouchableOpacity key={item} style={styles.rowItem} activeOpacity={0.7}>
              <Text style={styles.rowLabel}>{item}</Text>
              <ChevronRight size={18} color={theme.colors.text.secondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 HabitTracker</Text>
          <Text style={styles.footerText}>All rights reserved.</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  backButton: {
    padding: theme.spacing.xs,
    marginLeft: -theme.spacing.xs,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.text.primary,
  },
  headerPlaceholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: theme.spacing.xl,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoBox: {
    width: 100,
    height: 100,
    borderRadius: theme.radius.lg,
    backgroundColor: 'rgba(198,255,79,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(198,255,79,0.3)',
    marginBottom: theme.spacing.lg,
    shadowColor: theme.colors.accent.DEFAULT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    fontWeight: '600',
  },
  rowsContainer: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    overflow: 'hidden',
    marginTop: -40,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface.border,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  footer: {
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    color: theme.colors.text.tertiary,
    fontSize: 13,
    fontWeight: '500',
  },
});
