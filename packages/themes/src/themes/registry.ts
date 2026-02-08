import type { ThemeRegistry } from './types';
import { neutral } from './neutral';
import { gradient } from './gradient';
import { legal } from './legal';
import { validateThemeRegistry } from './resolver';

export const themes: ThemeRegistry = {
  neutral,
  gradient,
  legal,
};

// Validate on module load to catch circular dependencies early
validateThemeRegistry(themes);

// Export individual themes for direct access
export { neutral, gradient, legal };
