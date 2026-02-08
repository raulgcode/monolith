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
  const { mode, setMode } = useTheme();

  const cycleMode = () => {
    const modes: Array<'system' | 'light' | 'dark'> = ['system', 'light', 'dark'];
    const currentIndex = modes.indexOf(mode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setMode(modes[nextIndex]);
  };

  const Icon = icons[mode];

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleMode}
      title={labels[mode]}
      aria-label={`Current mode: ${labels[mode]}. Click to cycle.`}
    >
      <Icon className="h-5 w-5" />
    </Button>
  );
}
