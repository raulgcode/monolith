# Monolith

Full-stack monorepo boilerplate with **NestJS**, **React Router 7**, **Prisma**, **PostgreSQL**, **shadcn/ui**, and **Tailwind CSS**.

Authentication (login, register, JWT) included out of the box.

## Quick Start

```bash
npx github:raulgcode/create-monolith-app my-app
```

Or clone manually:

```bash
git clone https://github.com/raulgcode/monolith.git my-app
cd my-app
pnpm bootstrap  # Configura pnpm localmente (solo primera vez)
pnpm setup      # Instala deps, DB, migraciones, etc.
pnpm dev
```

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20 (with Corepack enabled)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

**Nota:** Este proyecto usa Corepack para gestionar pnpm automáticamente. No necesitas instalar pnpm globalmente.

## Commands

### Setup & Development

| Command              | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| `pnpm fresh-install` | Limpieza completa y reinstalación desde cero (Docker + deps) |
| `pnpm bootstrap`     | Configura pnpm localmente (primera vez / después de clonar)  |
| `pnpm setup`         | Install deps, start DB, run migrations, seed, build packages |
| `pnpm dev`           | Start API (port 3000) and Web (port 5173) in dev mode        |
| `pnpm build`         | Build all packages and apps for production                   |
| `pnpm start`         | Start all apps in production mode                            |
| `pnpm format`        | Format code with Prettier                                    |
| `pnpm typecheck`     | Run TypeScript type checking                                 |
| `pnpm lint`          | Run linters across all packages                              |

### Database

| Command                  | Description                                  |
| ------------------------ | -------------------------------------------- |
| `pnpm db:studio`         | Open Prisma Studio GUI at localhost:5555     |
| `pnpm db:push`           | Push schema changes to DB (non-interactive)  |
| `pnpm db:migrate`        | Create and run a new migration (interactive) |
| `pnpm db:migrate:create` | Create a named migration                     |
| `pnpm db:generate`       | Regenerate Prisma Client                     |
| `pnpm db:seed`           | Seed the database with admin user            |
| `pnpm db:setup`          | Push schema + seed (used by setup script)    |

### Docker

| Command                  | Description                           |
| ------------------------ | ------------------------------------- |
| `docker compose up -d`   | Start PostgreSQL container            |
| `docker compose down`    | Stop PostgreSQL container             |
| `docker compose down -v` | Stop and delete all data (full reset) |

## Project Structure

```
├── apps/
│   ├── api/                  # NestJS backend (port 3000)
│   │   └── src/
│   │       ├── auth/         # Login, register, JWT guard, change password
│   │       ├── users/        # User CRUD
│   │       ├── prisma.service.ts
│   │       └── main.ts
│   └── web/                  # React Router 7 frontend (port 5173)
│       └── app/
│           ├── components/ui/  # shadcn: Button, Input, Card, Avatar, etc.
│           ├── components/navbar/
│           ├── routes/
│           │   ├── login.tsx
│           │   ├── register.tsx
│           │   ├── logout.tsx
│           │   ├── _layout.tsx           # Protected layout (requires auth)
│           │   ├── _layout.dashboard.tsx  # Dashboard (index page)
│           │   └── _layout.profile.tsx    # Profile + change password
│           ├── lib/
│           │   ├── api.ts          # Axios client
│           │   ├── auth.server.ts  # Server-side auth helpers
│           │   └── utils.ts        # cn() for Tailwind
│           └── cookies.server.ts   # httpOnly cookie for JWT
├── packages/
│   ├── database/             # Prisma schema, migrations, seed
│   └── shared/               # Shared types + Zod validations
├── scripts/
│   └── setup.js              # Automated setup script
├── docker-compose.yml        # PostgreSQL 16
└── .env.example              # Environment template
```

## Default Credentials

| Field    | Value                |
| -------- | -------------------- |
| Email    | `admin@monolith.dev` |
| Password | `Admin123!`          |

## API Endpoints

### Auth (public)

- `POST /auth/login` - Sign in, returns JWT
- `POST /auth/register` - Create account, returns JWT

### Auth (protected)

- `GET /auth/me` - Get current user
- `GET /auth/profile` - Get JWT payload
- `POST /auth/change-password` - Change password

### Users (protected)

- `GET /users` - List all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Adding New Pages

Create a file in `apps/web/app/routes/` and add it to `routes.ts`:

```ts
// apps/web/app/routes/_layout.my-page.tsx
export default function MyPage() {
  return <h1>My New Page</h1>;
}
```

```ts
// apps/web/app/routes.ts
layout('routes/_layout.tsx', [
  index('routes/_layout.dashboard.tsx'),
  route('profile', 'routes/_layout.profile.tsx'),
  route('my-page', 'routes/_layout.my-page.tsx'), // add here
]),
```

## Adding New API Modules

```bash
cd apps/api
npx nest g module my-module
npx nest g controller my-module
npx nest g service my-module
```

## Full Reset

Usa el comando `pnpm fresh-install` para reiniciar completamente el proyecto:

```bash
pnpm fresh-install
```

**Este comando va a:**

1. Detener y eliminar todos los contenedores Docker y volúmenes
2. Eliminar node_modules en todos los workspaces
3. Eliminar pnpm-lock.yaml y archivos de build
4. Ejecutar bootstrap automáticamente
5. Ejecutar setup completo (DB, migraciones, seed)

**Cuándo usar fresh-install:**

- Después de problemas con dependencias
- Cuando el proyecto no arranca correctamente
- Para limpiar completamente el entorno de desarrollo
- Después de cambios importantes en package.json

**Alternativa manual:**

```bash
docker compose down -v
rm -rf node_modules pnpm-lock.yaml .turbo .env
pnpm bootstrap
pnpm setup
```

## Gestión de pnpm con Corepack

Este proyecto usa **Corepack** (incluido en Node.js) para gestionar pnpm automáticamente:

### Características

- **Sin instalación global**: Corepack descarga y activa pnpm automáticamente
- **Versión controlada**: La versión de pnpm está definida en `package.json`
- **Portable**: Cualquiera que clone el proyecto usa la misma versión
- **Sin contaminar el proyecto**: No crea directorios extra en la raíz

### Cómo funciona

El campo `packageManager` en `package.json` define la versión exacta:

```json
{
  "packageManager": "pnpm@10.4.1"
}
```

Corepack detecta esto automáticamente y usa esa versión específica.

### Flujo de trabajo

**Primera vez:**

```bash
git clone ...
cd monolith
pnpm bootstrap    # Activa Corepack
pnpm setup        # Instala todo y configura el proyecto
```

**Después:**

```bash
pnpm install      # Corepack usa la versión correcta automáticamente
pnpm dev          # Desarrolla normalmente
```

### Ventajas vs. pnpm global

| Aspecto       | Global          | Con Corepack |
| ------------- | --------------- | ------------ |
| Instalación   | `npm i -g pnpm` | Automático   |
| Versión       | Una para todo   | Por proyecto |
| Conflictos    | Posibles        | Ninguno      |
| Portabilidad  | Manual          | Automática   |
| Mantenimiento | Manual          | Transparente |
