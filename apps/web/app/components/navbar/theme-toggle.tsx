import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { useTheme } from '@monolith/themes/react';

const icons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const labels = {
  light: 'Light mode',
  dark: 'Dark mode',
  system: 'System',
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const themes: Array<'system' | 'light' | 'dark'> = ['system', 'light', 'dark'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const Icon = icons[theme];

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      title={labels[theme]}
      aria-label={`Current theme: ${labels[theme]}. Click to cycle.`}
    >
      <Icon className="h-5 w-5" />
    </Button>
  );
}
