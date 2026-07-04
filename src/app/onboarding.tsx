import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { BookOpen } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/lib/theme';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/signup');
  };

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* Onboarding Graphic Illustration */}
        <View style={styles.graphicContainer}>
          <LinearGradient
            colors={[theme.colors.illustration.purpleTop, theme.colors.illustration.purpleBottom]}
            style={styles.illustrationGradient}
          >
            {/* Background decorative glows */}
            <View style={styles.glowBlob} />
            <View style={styles.glowBlobSecondary} />

            {/* Simulated Onboarding Character Illustration */}
            <View style={styles.avatarCircle}>
              <BookOpen size={48} color={theme.colors.habit.meditate} />
            </View>
          </LinearGradient>
        </View>

        {/* Text Copy */}
        <View style={styles.textSection}>
          <Text style={styles.title}>Build Better Habits</Text>
          <Text style={styles.subtitle}>
            Track your habits, stay consistent and achieve your goals.
          </Text>
        </View>

        {/* Pager Dots */}
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Action Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleGetStarted}
            style={styles.getStartedButton}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          {/* Already have an account links */}
          <TouchableOpacity onPress={() => router.push('/signup')} activeOpacity={0.7} style={styles.loginLink}>
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginLinkText}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: theme.spacing.xxxl,
  },
  graphicContainer: {
    width: '100%',
    height: '48%',
    overflow: 'hidden',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  illustrationGradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowBlob: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: theme.colors.illustration.purpleTop,
    opacity: 0.6,
    top: 50,
  },
  glowBlobSecondary: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#381733',
    opacity: 0.3,
    bottom: -30,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(185,140,255,0.3)',
    shadowColor: theme.colors.habit.meditate,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  textSection: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: theme.spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginVertical: theme.spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.text.tertiary,
    opacity: 0.4,
  },
  dotActive: {
    width: 20,
    backgroundColor: theme.colors.accent.DEFAULT,
    opacity: 1,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    gap: theme.spacing.md,
  },
  getStartedButton: {
    backgroundColor: theme.colors.accent.DEFAULT,
    height: 52,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.accent.text,
  },
  loginLink: {
    alignSelf: 'center',
    paddingVertical: 4,
  },
  loginText: {
    color: theme.colors.text.secondary,
    fontSize: 14,
    fontWeight: '500',
  },
  loginLinkText: {
    color: theme.colors.accent.DEFAULT,
    fontWeight: '700',
  },
});
