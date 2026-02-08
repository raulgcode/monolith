import { execSync } from 'child_process';
import { existsSync, writeFileSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

function run(cmd, options = {}) {
  console.log(`\n> ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit', cwd: ROOT, ...options });
  } catch (error) {
    console.error(`Command failed: ${cmd}`);
    process.exit(1);
  }
}

function step(message) {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`  ${message}`);
  console.log('='.repeat(50));
}

// 1. Check Docker
step('1/6 - Checking Docker');
try {
  execSync('docker info', { stdio: 'pipe' });
  console.log('Docker is running.');
} catch {
  console.error('Docker is not running. Please start Docker Desktop and try again.');
  process.exit(1);
}

// 2. Create .env if it doesn't exist
step('2/6 - Setting up environment');
const envPath = resolve(ROOT, '.env');
const envExamplePath = resolve(ROOT, '.env.example');

if (!existsSync(envPath)) {
  const envContent = readFileSync(envExamplePath, 'utf-8');
  writeFileSync(envPath, envContent);
  console.log('Created .env from .env.example');
} else {
  console.log('.env already exists, skipping.');
}

// Create web .env if missing
const webEnvPath = resolve(ROOT, 'apps', 'web', '.env');
if (!existsSync(webEnvPath)) {
  writeFileSync(webEnvPath, 'VITE_API_URL=http://localhost:3000\n');
  console.log('Created apps/web/.env');
} else {
  console.log('apps/web/.env already exists, skipping.');
}

// 3. Install dependencies
step('3/6 - Installing dependencies');
run('pnpm install');

// 4. Start database container
step('4/6 - Starting PostgreSQL container');
run('docker compose up -d postgres');

// Wait for database to be ready
console.log('Waiting for PostgreSQL to be ready...');
let retries = 30;
while (retries > 0) {
  try {
    execSync('docker compose exec postgres pg_isready -U monolith', {
      stdio: 'pipe',
      cwd: ROOT,
    });
    console.log('PostgreSQL is ready!');
    break;
  } catch {
    retries--;
    if (retries === 0) {
      console.error('PostgreSQL failed to start. Check docker compose logs.');
      process.exit(1);
    }
    // Cross-platform sleep: use node's built-in setTimeout
    const start = Date.now();
    while (Date.now() - start < 1000) {
      // Busy wait for 1 second
    }
  }
}

// 5. Generate Prisma client, push schema, and seed
step('5/6 - Setting up database');
run('pnpm db:generate');
run('pnpm db:push');
run('pnpm db:seed');

// 6. Build shared packages
step('6/6 - Building shared packages');
run('pnpm --filter @monolith/shared build');
run('pnpm --filter @monolith/themes build');
run('pnpm --filter @monolith/database build');

console.log(`
${'='.repeat(50)}
  Setup complete!
${'='.repeat(50)}

  Start developing:
    pnpm dev

  Default admin credentials:
    Email:    admin@monolith.dev
    Password: Admin123!

  Services:
    Frontend:  http://localhost:5173
    API:       http://localhost:3000
    DB Studio: pnpm db:studio

${'='.repeat(50)}
`);
