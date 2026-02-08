import * as React from 'react';
import { themes } from '../themes/registry';
import { resolveTheme, resolveRadius } from '../themes/resolver';
import type { ThemeDefinition } from '../themes/types';

type Mode = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string; // Theme ID (e.g., 'neutral', 'gradient')
  defaultMode?: Mode;
  storageKey?: string;
}

interface ThemeProviderState {
  // Theme selection
  theme: string; // Current theme ID
  setTheme: (themeId: string) => void;
  availableThemes: ThemeDefinition[];

  // Mode selection
  mode: Mode;
  setMode: (mode: Mode) => void;
  resolvedMode: 'light' | 'dark';
}

const ThemeProviderContext = React.createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'neutral',
  defaultMode = 'system',
  storageKey = 'monolith',
}: ThemeProviderProps) {
  const themeNameKey = `${storageKey}-theme-name`;
  const themeModeKey = `${storageKey}-theme-mode`;

  // Initialize theme from localStorage or default
  const [theme, setThemeState] = React.useState<string>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(themeNameKey);
      return stored || defaultTheme;
    }
    return defaultTheme;
  });

  // Initialize mode from localStorage or default
  const [mode, setModeState] = React.useState<Mode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(themeModeKey);
      return (stored as Mode) || defaultMode;
    }
    return defaultMode;
  });

  // Resolve system preference
  const [resolvedMode, setResolvedMode] = React.useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';

    if (mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return mode;
  });

  // Apply theme colors and mode class
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = window.document.documentElement;

    // Remove existing mode classes
    root.classList.remove('light', 'dark');

    // Determine actual mode to apply
    let actualMode: 'light' | 'dark' = mode === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : mode;

    // Add mode class
    root.classList.add(actualMode);
    setResolvedMode(actualMode);

    // Resolve theme colors
    try {
      const colors = resolveTheme(theme, actualMode, themes);
      const radius = resolveRadius(theme, themes);

      // Apply colors as CSS variables
      Object.entries(colors).forEach(([key, value]) => {
        // Convert camelCase to kebab-case (e.g., cardForeground -> card-foreground)
        const cssKey = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
        root.style.setProperty(`--color-${cssKey}`, value);
      });

      // Apply radius
      root.style.setProperty('--radius', radius);

      // Set data attribute for theme
      root.setAttribute('data-theme', theme);
    } catch (error) {
      console.error('Failed to apply theme:', error);
    }
  }, [theme, mode]);

  // Listen to system preference changes
  React.useEffect(() => {
    if (mode === 'system' && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChange = () => {
        const systemMode = mediaQuery.matches ? 'dark' : 'light';
        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');
        root.classList.add(systemMode);
        setResolvedMode(systemMode);

        // Reapply colors for new mode
        try {
          const colors = resolveTheme(theme, systemMode, themes);
          Object.entries(colors).forEach(([key, value]) => {
            const cssKey = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
            root.style.setProperty(`--color-${cssKey}`, value);
          });
        } catch (error) {
          console.error('Failed to apply theme:', error);
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [mode, theme]);

  const setTheme = React.useCallback(
    (newTheme: string) => {
      if (!themes[newTheme]) {
        console.error(`Theme '${newTheme}' not found in registry`);
        return;
      }
      localStorage.setItem(themeNameKey, newTheme);
      setThemeState(newTheme);
    },
    [themeNameKey],
  );

  const setMode = React.useCallback(
    (newMode: Mode) => {
      localStorage.setItem(themeModeKey, newMode);
      setModeState(newMode);
    },
    [themeModeKey],
  );

  const availableThemes = React.useMemo(() => Object.values(themes), []);

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
      availableThemes,
      mode,
      setMode,
      resolvedMode,
    }),
    [theme, setTheme, availableThemes, mode, setMode, resolvedMode],
  );

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
