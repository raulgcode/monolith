export const colors = {
  background: {
    light: 'oklch(0.99 0.005 250)',
    dark: 'oklch(0.12 0.02 250)',
  },
  foreground: {
    light: 'oklch(0.15 0.02 250)',
    dark: 'oklch(0.95 0.01 250)',
  },
  card: {
    light: 'oklch(1 0 0)',
    dark: 'oklch(0.18 0.025 250)',
  },
  cardForeground: {
    light: 'oklch(0.15 0.02 250)',
    dark: 'oklch(0.95 0.01 250)',
  },
  popover: {
    light: 'oklch(1 0 0)',
    dark: 'oklch(0.18 0.025 250)',
  },
  popoverForeground: {
    light: 'oklch(0.15 0.02 250)',
    dark: 'oklch(0.95 0.01 250)',
  },
  primary: {
    light: 'oklch(0.55 0.22 250)',
    dark: 'oklch(0.65 0.25 250)',
  },
  primaryForeground: {
    light: 'oklch(0.99 0 0)',
    dark: 'oklch(0.12 0.02 250)',
  },
  secondary: {
    light: 'oklch(0.96 0.01 250)',
    dark: 'oklch(0.30 0.03 250)',
  },
  secondaryForeground: {
    light: 'oklch(0.15 0.02 250)',
    dark: 'oklch(0.95 0.01 250)',
  },
  muted: {
    light: 'oklch(0.96 0.01 250)',
    dark: 'oklch(0.30 0.03 250)',
  },
  mutedForeground: {
    light: 'oklch(0.50 0.01 250)',
    dark: 'oklch(0.70 0.01 250)',
  },
  accent: {
    light: 'oklch(0.75 0.15 220)',
    dark: 'oklch(0.70 0.20 220)',
  },
  accentForeground: {
    light: 'oklch(0.99 0 0)',
    dark: 'oklch(0.12 0.02 250)',
  },
  destructive: {
    light: 'oklch(0.577 0.245 27.325)',
    dark: 'oklch(0.60 0.20 30)',
  },
  destructiveForeground: {
    light: 'oklch(0.985 0 0)',
    dark: 'oklch(0.985 0 0)',
  },
  border: {
    light: 'oklch(0.90 0.01 250)',
    dark: 'oklch(0.25 0.02 250)',
  },
  input: {
    light: 'oklch(0.90 0.01 250)',
    dark: 'oklch(0.25 0.02 250)',
  },
  ring: {
    light: 'oklch(0.55 0.22 250)',
    dark: 'oklch(0.65 0.25 250)',
  },
} as const;

export type ColorToken = keyof typeof colors;
