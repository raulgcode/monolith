#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

console.log(`
╔═══════════════════════════════════════════════════════════╗
║  Bootstrap del Proyecto - Configuración Local de pnpm    ║
╚═══════════════════════════════════════════════════════════╝
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
    throw new Error(`Command failed: ${cmd}`);
  }
}

function checkCommand(cmd) {
  try {
    execSync(`${cmd} --version`, { stdio: 'pipe', shell: true });
    return true;
  } catch {
    return false;
  }
}

// 1. Verificar Node.js
console.log('\n[1/2] Verificando Node.js...');
const nodeVersion = process.version;
console.log(`✓ Node.js ${nodeVersion} detectado`);

// 2. Habilitar Corepack (viene con Node.js 14.19+)
console.log('\n[2/2] Habilitando Corepack para gestión de pnpm...');
try {
  if (checkCommand('corepack')) {
    run('corepack enable', { stdio: 'pipe' });
    console.log('✓ Corepack habilitado');

    // Preparar la versión específica de pnpm del package.json
    run('corepack prepare pnpm@10.4.1 --activate', { stdio: 'pipe' });
    console.log('✓ pnpm@10.4.1 preparado y activado localmente');
  } else {
    console.log('⚠ Corepack no disponible. Instalando pnpm globalmente como fallback...');
    run('npm install -g pnpm@10.4.1');
  }
} catch (error) {
  console.error('✗ Error al configurar pnpm:', error.message);
  process.exit(1);
}

// Verificar pnpm
console.log('\nVerificando instalación de pnpm...');
let pnpmVersion;
try {
  pnpmVersion = execSync('pnpm --version', {
    encoding: 'utf-8',
    cwd: ROOT,
    shell: true,
  }).trim();
  console.log(`✓ pnpm ${pnpmVersion} listo para usar`);
} catch (error) {
  console.error('✗ No se pudo verificar pnpm');
  process.exit(1);
}

console.log(`
╔═══════════════════════════════════════════════════════════╗
║  ✓ Bootstrap completado exitosamente                     ║
╚═══════════════════════════════════════════════════════════╝

Configuración:
  • pnpm ${pnpmVersion} activado mediante Corepack
  • Store global de pnpm (no contamina el proyecto)
  • Versión controlada por package.json

Siguientes pasos:
  1. Configurar proyecto:     pnpm run setup
  2. Iniciar desarrollo:      pnpm dev

Nota: pnpm se gestiona automáticamente con Corepack.
      No se requieren instalaciones globales manuales.
`);
