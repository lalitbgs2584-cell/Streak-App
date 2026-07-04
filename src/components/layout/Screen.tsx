/**
 * Screen.tsx
 * ----------------------------------------------------------------------------
 * WHY safe-area and keyboard-avoiding live HERE and not in AppBackground:
 * They are per-screen concerns. A form screen (Login, New Habit) needs
 * KeyboardAvoidingView; a list screen (Today, History) doesn't. An
 * illustration screen (Onboarding) doesn't want safe-area padding at the
 * top because the image should bleed under the status bar. Making these
 * props (with sane defaults) means every screen gets the RIGHT behavior,
 * not the SAME behavior.
 *
 * WHY `edges` prop instead of always padding all 4 sides:
 * react-native-safe-area-context lets you choose which edges get inset
 * padding. A screen with a custom header often wants edges={['bottom']}
 * only, because the header already handles the top inset itself.
 */

import { theme } from '@/lib/theme';
import React, { PropsWithChildren } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';


type Props = PropsWithChildren<{
  scroll?: boolean;              // wrap content in ScrollView
  keyboardAvoiding?: boolean;    // wrap in KeyboardAvoidingView (forms only)
  edges?: Edge[];                // which safe-area edges to respect
  padded?: boolean;              // apply theme.spacing.base horizontal padding
  onRefresh?: () => void;        // enables pull-to-refresh (requires scroll)
  refreshing?: boolean;
}>;

const EXTRA_BOTTOM_SPACING = theme.spacing.huge + theme.spacing.sm;

export function Screen({
  children,
  scroll = false,
  keyboardAvoiding = false,
  edges = ['top', 'bottom'],
  padded = true,
  onRefresh,
  refreshing = false,
}: Props) {
  const content = scroll ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[styles.scrollContent, padded && styles.padded]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.accent.DEFAULT}
          />
        ) : undefined
      }
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, padded && styles.padded]}>{children}</View>
  );

  const body = keyboardAvoiding ? (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );

  return (
    <SafeAreaView style={[styles.flex, styles.background]} edges={edges}>
      {body}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  background: { backgroundColor: theme.colors.background.primary },
  screen: { flex: 1, paddingBottom: EXTRA_BOTTOM_SPACING },
  padded: { paddingHorizontal: theme.spacing.base },
  scrollContent: { flexGrow: 1, paddingBottom: EXTRA_BOTTOM_SPACING },
});