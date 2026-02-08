import type { ThemeColors, ThemeDefinition, ThemeRegistry } from './types';

/**
 * Resolves a theme's colors for a specific mode, handling inheritance chain
 */
export function resolveTheme(
  themeId: string,
  mode: 'light' | 'dark',
  registry: ThemeRegistry,
): ThemeColors {
  const theme = registry[themeId];

  if (!theme) {
    throw new Error(`Theme '${themeId}' not found in registry`);
  }

  if ('extends' in theme && theme.extends) {
    // Extended theme: recursively resolve parent and merge
    const parentColors = resolveTheme(theme.extends, mode, registry);
    const themeColors = theme[mode] || {};
    return { ...parentColors, ...themeColors } as ThemeColors;
  }

  // Base theme: return colors directly
  return theme[mode] as ThemeColors;
}

/**
 * Gets the radius value for a theme, following inheritance chain
 */
export function resolveRadius(themeId: string, registry: ThemeRegistry): string {
  const theme = registry[themeId];

  if (!theme) {
    throw new Error(`Theme '${themeId}' not found in registry`);
  }

  if (theme.radius) {
    return theme.radius;
  }

  if ('extends' in theme && theme.extends) {
    return resolveRadius(theme.extends, registry);
  }

  // Default fallback
  return '0.5rem';
}

/**
 * Validates theme registry to prevent circular dependencies
 */
export function validateThemeRegistry(registry: ThemeRegistry): void {
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  function detectCycle(themeId: string): boolean {
    if (recursionStack.has(themeId)) {
      return true; // Cycle detected
    }

    if (visited.has(themeId)) {
      return false; // Already validated
    }

    const theme = registry[themeId];
    if (!theme) {
      throw new Error(`Theme '${themeId}' not found in registry`);
    }

    visited.add(themeId);
    recursionStack.add(themeId);

    if ('extends' in theme && theme.extends) {
      if (detectCycle(theme.extends)) {
        throw new Error(
          `Circular dependency detected in theme inheritance: ${themeId} -> ${theme.extends}`,
        );
      }
    }

    recursionStack.delete(themeId);
    return false;
  }

  // Validate all themes
  for (const themeId of Object.keys(registry)) {
    detectCycle(themeId);
  }
}
