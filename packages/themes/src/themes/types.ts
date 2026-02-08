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

// Base theme definition (no inheritance)
export interface BaseThemeDefinition {
  id: string;
  name: string;
  description?: string;
  light: ThemeColors;
  dark: ThemeColors;
  radius?: string;
}

// Extended theme definition (with inheritance)
export interface ExtendedThemeDefinition {
  id: string;
  name: string;
  description?: string;
  extends: string; // Parent theme ID
  light: Partial<ThemeColors>; // Override specific colors
  dark: Partial<ThemeColors>;
  radius?: string;
}

export type ThemeDefinition = BaseThemeDefinition | ExtendedThemeDefinition;

// Theme registry
export interface ThemeRegistry {
  [themeId: string]: ThemeDefinition;
}

// Legacy interface for backwards compatibility
export interface ThemeConfig {
  themes: {
    light: ThemeDefinition;
    dark: ThemeDefinition;
  };
  defaultMode: ThemeMode | 'system';
}
