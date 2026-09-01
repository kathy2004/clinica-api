import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AgendamentosService {
  constructor(private prisma: PrismaService) {}

  criar(dados: { fichaId: string; dataHora: string; observacoes?: string }) {
    return this.prisma.agendamento.create({
      data: {
        fichaId: dados.fichaId,
        dataHora: new Date(dados.dataHora),
        observacoes: dados.observacoes,
      },
    });
  }

  listarPorFicha(fichaId: string) {
    return this.prisma.agendamento.findMany({
      where: { fichaId },
      orderBy: { dataHora: 'asc' },
    });
  }

  // Lista todos os agendamentos de um dia específico, com paciente e profissional
  async listarPorDia(dataInicio: Date, dataFim: Date) {
    return this.prisma.agendamento.findMany({
      where: {
        dataHora: { gte: dataInicio, lte: dataFim },
      },
      orderBy: { dataHora: 'asc' },
      include: {
        ficha: {
          include: { paciente: true, profissional: true },
        },
      },
    });
  }

  atualizarStatus(id: string, status: 'AGENDADO' | 'CONFIRMADO' | 'CANCELADO' | 'REALIZADO') {
    return this.prisma.agendamento.update({ where: { id }, data: { status } });
  }

  atualizar(id: string, dados: { dataHora?: string; observacoes?: string }) {
    return this.prisma.agendamento.update({
      where: { id },
      data: {
        ...dados,
        dataHora: dados.dataHora ? new Date(dados.dataHora) : undefined,
      },
    });
  }

  remover(id: string) {
    return this.prisma.agendamento.delete({ where: { id } });
  }
}