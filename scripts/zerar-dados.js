const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // A ordem importa: primeiro apaga quem "depende" de outra tabela,
  // por último apaga quem é a "base" (senão o banco recusa por causa das relações)
  const agendamentos = await prisma.agendamento.deleteMany();
  console.log(`Agendamentos apagados: ${agendamentos.count}`);

  const atendimentos = await prisma.atendimento.deleteMany();
  console.log(`Atendimentos apagados: ${atendimentos.count}`);

  const fichas = await prisma.ficha.deleteMany();
  console.log(`Fichas apagadas: ${fichas.count}`);

  const pacientes = await prisma.paciente.deleteMany();
  console.log(`Pacientes apagados: ${pacientes.count}`);

  const profissionais = await prisma.profissional.deleteMany();
  console.log(`Profissionais apagados: ${profissionais.count}`);

  console.log('\nBanco de dados zerado. O login da secretaria foi mantido.');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());