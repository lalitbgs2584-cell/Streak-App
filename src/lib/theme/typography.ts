/**
 * typography.ts
 * ----------------------------------------------------------------------------
 * WHY named roles (display/title/heading/body...) instead of just fontSize
 * numbers: a designer thinks "this is a Title," not "this is 24px SemiBold."
 * Naming the role means when you build <Title>Read</Title> you never touch
 * a number again — and if you later swap the whole app to a bigger type
 * scale for accessibility, you edit this one file.
 *
 * Font family is 'System' for now (San Francisco on iOS / Roboto on
 * Android) — free, no load time, looks native. When you're ready for a
 * custom premium font (e.g. Inter, General Sans), you load it with
 * expo-font in your root layout and just swap the values below. Nothing
 * else in the app changes.
 */

export const fontFamily = {
  regular: 'System',
  medium: 'System',
  semibold: 'System',
  bold: 'System',
} as const;

// React Native fontWeight must be one of these exact string values.
export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const typography = {
  display: { fontSize: 32, lineHeight: 40, fontWeight: fontWeight.bold },      // "Today", "12" streak number
  title: { fontSize: 24, lineHeight: 32, fontWeight: fontWeight.bold },        // "Welcome Back", "All Habits"
  heading: { fontSize: 20, lineHeight: 28, fontWeight: fontWeight.semibold },  // section titles, "Drink Water"
  subheading: { fontSize: 17, lineHeight: 24, fontWeight: fontWeight.semibold},// card titles
  body: { fontSize: 15, lineHeight: 22, fontWeight: fontWeight.regular },      // default text
  bodyMedium: { fontSize: 15, lineHeight: 22, fontWeight: fontWeight.medium },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: fontWeight.regular },   // "8 glasses a day", timestamps
  label: { fontSize: 12, lineHeight: 16, fontWeight: fontWeight.medium },      // form labels
  overline: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: fontWeight.semibold,
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
  },
} as const;

export type Typography = typeof typography;