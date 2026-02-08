export function ThemeScript({ storageKey = 'monolith-theme' }: { storageKey?: string }) {
  const themeScript = `
    (function() {
      try {
        const theme = localStorage.getItem('${storageKey}') || 'system';
        const root = document.documentElement;

        if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
          root.classList.add(systemTheme);
        } else {
          root.classList.add(theme);
        }
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
