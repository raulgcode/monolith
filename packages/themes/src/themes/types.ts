export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

export interface ThemeDefinition {
  id: string;
  name: string;
  colors: ThemeColors;
  radius?: string;
}

export interface ThemeConfig {
  themes: {
    light: ThemeDefinition;
    dark: ThemeDefinition;
  };
  defaultMode: ThemeMode | 'system';
}
