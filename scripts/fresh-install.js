#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

console.log(`
╔═══════════════════════════════════════════════════════════╗
║           Fresh Install - Reinicio Completo              ║
╚═══════════════════════════════════════════════════════════╝

⚠️  ADVERTENCIA: Este script eliminará:
   - Todos los contenedores Docker y volúmenes
   - node_modules en todos los workspaces
   - pnpm-lock.yaml
   - Archivos de build (.turbo, dist, build)

`);

function run(cmd, options = {}) {
  console.log(`\n→ ${cmd}`);
  try {
    return execSync(cmd, {
      stdio: 'inherit',
      cwd: ROOT,
      shell: true,
      ...options,
    });
  } catch (error) {
    // Algunos comandos pueden fallar si los recursos no existen
    if (!options.allowFailure) {
      throw new Error(`Command failed: ${cmd}`);
    }
  }
}

function step(message) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`  ${message}`);
  console.log('='.repeat(60));
}

// 1. Detener y eliminar contenedores Docker
step('1/4 - Limpiando contenedores Docker');
try {
  run('docker compose down -v', { allowFailure: true });
  console.log('✓ Contenedores Docker eliminados');
} catch (error) {
  console.log('⚠ No hay contenedores Docker para limpiar');
}

// 2. Eliminar archivos de instalación
step('2/4 - Eliminando archivos de instalación');
const pathsToDelete = ['node_modules', 'pnpm-lock.yaml', '.turbo'];

pathsToDelete.forEach((path) => {
  const fullPath = resolve(ROOT, path);
  if (existsSync(fullPath)) {
    console.log(`Eliminando: ${path}`);
    run(`rm -rf "${fullPath}"`, { allowFailure: true });
  }
});

// Limpiar node_modules y builds en workspaces
console.log('\nLimpiando workspaces...');
run(
  'find . -type d \\( -name "node_modules" -o -name "dist" -o -name "build" \\) -not -path "./node_modules/*" -exec rm -rf {} + 2>/dev/null || true',
  {
    stdio: 'pipe',
    allowFailure: true,
  },
);

// Limpiar archivos temporales de Claude
run('rm -f tmpclaude* 2>/dev/null || true', {
  stdio: 'pipe',
  allowFailure: true,
});

console.log('✓ Archivos de instalación eliminados');

// 3. Ejecutar bootstrap
step('3/4 - Ejecutando bootstrap');
try {
  run('node scripts/bootstrap.js');
  console.log('✓ Bootstrap completado');
} catch (error) {
  console.error('✗ Error al ejecutar bootstrap');
  process.exit(1);
}

// 4. Ejecutar setup
step('4/4 - Ejecutando setup completo');
try {
  run('pnpm run setup');
  console.log('✓ Setup completado');
} catch (error) {
  console.error('✗ Error al ejecutar setup');
  process.exit(1);
}

console.log(`
╔═══════════════════════════════════════════════════════════╗
║           ✓ Fresh Install Completado                     ║
╚═══════════════════════════════════════════════════════════╝

Todo está listo para comenzar:

  pnpm dev              # Iniciar desarrollo
  pnpm db:studio        # Abrir base de datos

Credenciales por defecto:
  Email:    admin@monolith.dev
  Password: Admin123!

Servicios:
  Frontend:  http://localhost:5173
  API:       http://localhost:3000

${'='.repeat(60)}
`);
