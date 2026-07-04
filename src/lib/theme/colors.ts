/**
 * colors.ts
 * ----------------------------------------------------------------------------
 * Single source of truth for every color in the app.
 *
 * WHY this file exists:
 * If a designer says "make the accent green slightly more yellow," you change
 * ONE hex value here and every button, checkmark, progress ring, and badge in
 * the app updates. Without this file you'd be grep-ing for "#C6FF4F" across
 * 40 components.
 *
 * WHY the structure (background/surface/accent/text/status/habit) instead of
 * one flat list:
 * Flat lists ("green", "green2", "greenLight") don't tell you WHERE to use a
 * color. Semantic grouping tells you the *role* — "this is a card surface,"
 * "this is secondary text" — so when you build a new screen you ask "what
 * role does this element play?" not "which of my 40 colors looks right?"
 */

export const colors = {
  // The base app canvas. Slightly different shades create depth without
  // needing borders — this is what makes the dark UI feel "premium" instead
  // of flat black.
  background: {
    primary: '#0A0A0F',     // root screen background
    secondary: '#101018',   // subtly lighter, used for gradient bottom-stop
    elevated: '#15151D',    // headers, tab bar background
  },

  // Cards, sheets, inputs — anything sitting "on top of" the background.
  surface: {
    card: '#1B1B22',        // HabitCard, StatCard, StreakCard base
    cardElevated: '#232330',// pressed/active card state, modals
    input: '#1A1A21',
    border: '#2A2A34',      // hairline borders on cards/inputs
    glass: 'rgba(255,255,255,0.04)', // glassmorphism overlay tint
  },

  // The signature neon-green. Kept in its own group because it's used for
  // MANY roles (buttons, active tab, progress fill, selected day) — grouping
  // them means you never hardcode the hex in a component.
  accent: {
    DEFAULT: '#C6FF4F',
    pressed: '#AEE83C',     // darker, for :active/onPressIn states
    muted: 'rgba(198,255,79,0.16)', // chip backgrounds, subtle highlights
    glow: 'rgba(198,255,79,0.35)',  // used in shadow/glow effects only
    text: '#0A0A0F',        // text color WHEN placed on top of accent bg
  },

  text: {
    primary: '#FFFFFF',
    secondary: '#9A9AA6',   // subtitles, timestamps, "8 glasses a day"
    tertiary: '#6B6B76',    // placeholders, disabled text
    inverse: '#0A0A0F',     // text on light/accent backgrounds
  },

  status: {
    success: '#C6FF4F',
    error: '#FF5C5C',       // delete button, destructive actions
    warning: '#FFB443',
    info: '#4FA3FF',
  },

  // Every habit gets a stable identity color used for its icon background,
  // illustration accent, and small dot indicators. Centralizing this means
  // adding a new habit type is a one-line addition, not a design decision
  // made fresh in every component that renders a habit.
  habit: {
    water: '#4FA3FF',
    workout: '#FF6B9D',
    read: '#FFB443',
    meditate: '#B98CFF',
    running: '#FF7A4F',
    sleep: '#7C6BFF',
    journal: '#4FD1C5',
    study: '#FFD54F',
    code: '#4FE0C6',
    eating: '#8CE86B',
    walking: '#5FD3A0',
    stretching: '#E88CD8',
  },

  // Illustration/onboarding backgrounds use a purple-to-black gradient
  // (see screens 1, 17, 20). Kept as raw color pairs — LinearGradient in
  // gradients.ts references these.
  illustration: {
    purpleTop: '#241733',
    purpleBottom: '#0E0A16',
    warmTop: '#331722',
    warmBottom: '#0E0A16',
  },

  overlay: {
    scrim: 'rgba(0,0,0,0.55)',       // behind modals/bottom sheets
    statusBarBlur: 'rgba(10,10,15,0.7)',
  },
} as const;

export type Colors = typeof colors;