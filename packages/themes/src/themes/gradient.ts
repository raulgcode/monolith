import type { ExtendedThemeDefinition } from './types';

export const gradient: ExtendedThemeDefinition = {
  id: 'gradient',
  name: 'Gradient (Blue/Purple)',
  description: 'Modern tech theme with blue/purple gradients',
  extends: 'neutral',
  light: {
    // Colores vibrantes azul/púrpura - Light mode
    background: 'oklch(0.99 0.005 260)',
    foreground: 'oklch(0.20 0.01 260)',
    card: 'oklch(0.98 0.01 260)',
    cardForeground: 'oklch(0.20 0.01 260)',
    primary: 'oklch(0.50 0.25 260)', // Azul vibrante
    primaryForeground: 'oklch(0.99 0 0)',
    accent: 'oklch(0.65 0.22 290)', // Púrpura brillante
    accentForeground: 'oklch(0.99 0 0)',
    secondary: 'oklch(0.55 0.20 240)', // Azul medio
    secondaryForeground: 'oklch(0.99 0 0)',
    muted: 'oklch(0.96 0.01 260)',
    mutedForeground: 'oklch(0.50 0.01 260)',
    border: 'oklch(0.90 0.02 260)',
    input: 'oklch(0.90 0.02 260)',
    ring: 'oklch(0.65 0.22 290)',
  },
  dark: {
    // Colores vibrantes azul/púrpura - Dark mode
    background: 'oklch(0.12 0.03 260)',
    foreground: 'oklch(0.95 0.01 260)',
    card: 'oklch(0.18 0.04 260)',
    cardForeground: 'oklch(0.95 0.01 260)',
    popover: 'oklch(0.18 0.04 260)',
    popoverForeground: 'oklch(0.95 0.01 260)',
    primary: 'oklch(0.65 0.28 260)', // Azul brillante
    primaryForeground: 'oklch(0.12 0.03 260)',
    accent: 'oklch(0.70 0.25 290)', // Púrpura vibrante
    accentForeground: 'oklch(0.12 0.03 260)',
    secondary: 'oklch(0.60 0.22 240)', // Azul cyan
    secondaryForeground: 'oklch(0.12 0.03 260)',
    muted: 'oklch(0.30 0.04 260)',
    mutedForeground: 'oklch(0.65 0.01 260)',
    border: 'oklch(0.30 0.04 260)',
    input: 'oklch(0.30 0.04 260)',
    ring: 'oklch(0.70 0.25 290)',
  },
  radius: '0.625rem',
};
