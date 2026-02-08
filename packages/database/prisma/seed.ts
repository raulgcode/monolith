import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seed started...');

  // Aquí se pueden agregar datos de ejemplo para otras tablas
  // NO crear usuarios por defecto

  console.log('Seed complete. No default users created.');
  console.log('Run the application and access /setup to create the first admin user.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
