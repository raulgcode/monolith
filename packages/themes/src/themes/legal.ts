import type { ExtendedThemeDefinition } from './types';

export const legal: ExtendedThemeDefinition = {
  id: 'legal',
  name: 'Legal (Law Firm)',
  description: 'Professional theme for law firms with blue accents',
  extends: 'neutral',
  light: {
    // Colores profesionales para bufete de abogados - Light mode
    background: 'oklch(0.99 0.002 240)',
    foreground: 'oklch(0.20 0.01 240)',
    card: 'oklch(0.98 0.005 240)',
    cardForeground: 'oklch(0.20 0.01 240)',
    primary: 'oklch(0.45 0.15 240)', // Azul profundo profesional
    primaryForeground: 'oklch(0.99 0 0)',
    accent: 'oklch(0.60 0.18 240)', // Azul cielo brillante
    accentForeground: 'oklch(0.99 0 0)',
    secondary: 'oklch(0.35 0.10 240)', // Azul marino oscuro
    secondaryForeground: 'oklch(0.99 0 0)',
    muted: 'oklch(0.95 0.005 240)',
    mutedForeground: 'oklch(0.50 0.01 240)',
    border: 'oklch(0.85 0.02 240)',
    input: 'oklch(0.90 0.01 240)',
    ring: 'oklch(0.60 0.18 240)',
  },
  dark: {
    // Colores profesionales para bufete de abogados - Dark mode
    background: 'oklch(0.15 0.01 240)',
    foreground: 'oklch(0.95 0.01 240)',
    card: 'oklch(0.20 0.015 240)',
    cardForeground: 'oklch(0.95 0.01 240)',
    primary: 'oklch(0.65 0.20 240)', // Azul brillante
    primaryForeground: 'oklch(0.15 0.01 240)',
    accent: 'oklch(0.70 0.22 230)', // Azul cielo vibrante
    accentForeground: 'oklch(0.15 0.01 240)',
    secondary: 'oklch(0.40 0.12 240)', // Azul medio
    secondaryForeground: 'oklch(0.95 0.01 240)',
    muted: 'oklch(0.28 0.02 240)',
    mutedForeground: 'oklch(0.65 0.01 240)',
    border: 'oklch(0.30 0.03 240)',
    input: 'oklch(0.28 0.02 240)',
    ring: 'oklch(0.70 0.22 230)',
  },
  radius: '0.375rem', // Bordes más cuadrados para look profesional
};
