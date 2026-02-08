import { defineConfig } from 'tsup';

export default defineConfig([
  // Build principal para tokens y themes
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    sourcemap: true,
  },
  // Build separado para componentes React
  {
    entry: ['src/react/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    outDir: 'dist/react',
    sourcemap: true,
    external: ['react'],
  },
]);
