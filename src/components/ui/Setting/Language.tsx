import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { theme } from '@/lib/theme';
import { SettingsDetailScreen } from './SettingsDetailScreen';


const LANGUAGES = ['English', 'Hindi', 'Spanish', 'French', 'German'];

export default function LanguageScreen() {
  const [selected, setSelected] = useState('English');

  return (
    <SettingsDetailScreen title="Language">
      <View style={styles.card}>
        {LANGUAGES.map((lang, i) => (
          <Pressable
            key={lang}
            onPress={() => setSelected(lang)}
            style={[styles.row, i !== LANGUAGES.length - 1 && styles.divider]}
          >
            <Text style={styles.label}>{lang}</Text>
            {selected === lang && (
              <Check size={18} color={theme.colors.accent.DEFAULT} strokeWidth={3} />
            )}
          </Pressable>
        ))}
      </View>
    </SettingsDetailScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.base,
    paddingHorizontal: theme.spacing.base,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.surface.border,
  },
  label: { ...theme.typography.body, color: theme.colors.text.primary },
});