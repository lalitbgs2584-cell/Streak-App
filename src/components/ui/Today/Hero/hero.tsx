import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { theme } from '@/lib/theme';

type ProgressHeroProps = {
  completed: number;
  total: number;
};

const Progress = ({ completed = 0, total = 0 }: ProgressHeroProps) => {
  const router = useRouter();
  const progress = total > 0 ? completed / total : 0;
  const progressPercentage = Math.round(progress * 100);

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => router.push('/streak-detail')}
      style={styles.container}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>Daily Progress</Text>
        <Text style={styles.quote}>
          Every repetition is a vote for the person you want to become.
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>{progressPercentage}% Completed</Text>
          <Text style={styles.countText}>{completed} of {total} habits</Text>
        </View>
        <View style={styles.barContainer}>
          <View style={[styles.barFill, { width: `${progressPercentage}%` }]} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.base,
    marginHorizontal: 20,
    marginTop: theme.spacing.base,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
  },
  textContainer: {
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  quote: {
    fontSize: 13,
    fontStyle: 'italic',
    color: theme.colors.text.secondary,
    lineHeight: 18,
  },
  progressContainer: {
    marginTop: theme.spacing.xs,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.accent.DEFAULT,
  },
  countText: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    fontWeight: '600',
  },
  barContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: theme.colors.accent.DEFAULT,
  },
});