const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const senhaHash = await bcrypt.hash('senha123', 10);
  const secretaria = await prisma.secretaria.create({
    data: { usuario: 'secretaria', senhaHash },
  });
  console.log('Usuário criado:', secretaria.usuario);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());