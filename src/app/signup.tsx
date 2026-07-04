import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Shield, User } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/lib/theme';

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Navigate directly to the dashboard
    router.replace('/(tabs)/today');
  };

  return (
    <Screen keyboardAvoiding padded={false} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Let&apos;s get you started</Text>
        </View>

        {/* Inputs Form */}
        <View style={styles.form}>
          {/* Name */}
          <View style={styles.inputContainer}>
            <User size={20} color={theme.colors.text.tertiary} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Name"
              placeholderTextColor={theme.colors.text.tertiary}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Mail size={20} color={theme.colors.text.tertiary} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              placeholderTextColor={theme.colors.text.tertiary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Shield size={20} color={theme.colors.text.tertiary} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor={theme.colors.text.tertiary}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignUp}
            activeOpacity={0.8}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Social Authentication */}
        <View style={styles.footer}>
          <Text style={styles.socialText}>Or continue with</Text>
          <View style={styles.socialRow}>
            {['Google', 'Apple', 'Email'].map((provider) => (
              <TouchableOpacity
                key={provider}
                style={styles.socialIconBox}
                onPress={handleSignUp}
                activeOpacity={0.7}
              >
                <Text style={styles.socialIconText}>{provider[0]}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Login Link */}
          <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7} style={styles.loginLink}>
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
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xxxl,
  },
  header: {
    marginTop: theme.spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  form: {
    gap: theme.spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface.input,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    borderRadius: theme.radius.md,
    height: 54,
    paddingHorizontal: theme.spacing.md,
  },
  inputIcon: {
    marginRight: theme.spacing.sm,
  },
  textInput: {
    flex: 1,
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  signUpButton: {
    backgroundColor: theme.colors.accent.DEFAULT,
    height: 52,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.accent.text,
  },
  footer: {
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  socialText: {
    color: theme.colors.text.tertiary,
    fontSize: 14,
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 16,
  },
  socialIconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.surface.card,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIconText: {
    color: theme.colors.text.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  loginLink: {
    marginTop: theme.spacing.sm,
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
