import * as React from 'react';

interface ThemeSelectorProps {
  children: (props: {
    theme: string;
    setTheme: (themeId: string) => void;
    availableThemes: Array<{ id: string; name: string; description?: string }>;
  }) => React.ReactNode;
}

/**
 * Headless theme selector component
 * Provides theme selection logic without UI
 * Use this to build custom theme selector UIs
 */
export function ThemeSelector({ children }: ThemeSelectorProps) {
  // This would typically use useTheme, but to avoid circular deps,
  // we export a render prop component that consumers can use
  throw new Error('ThemeSelector should be used from @monolith/themes/react via useTheme hook');
}
