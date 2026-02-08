export function ThemeScript({ storageKey = 'monolith' }: { storageKey?: string } = {}) {
  const themeScript = `
    (function() {
      try {
        const themeName = localStorage.getItem('${storageKey}-theme-name') || 'neutral';
        const mode = localStorage.getItem('${storageKey}-theme-mode') || 'system';
        const root = document.documentElement;

        // Resolve system preference
        let resolvedMode = mode;
        if (mode === 'system') {
          resolvedMode = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
        }

        // Apply mode class
        root.classList.add(resolvedMode);

        // Apply theme data attribute
        root.setAttribute('data-theme', themeName);
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
