import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  private limitesDoDia(data: Date) {
    const inicio = new Date(data.getFullYear(), data.getMonth(), data.getDate(), 0, 0, 0, 0);
    const fim = new Date(data.getFullYear(), data.getMonth(), data.getDate(), 23, 59, 59, 999);
    return { inicio, fim };
  }

  private limitesDoMes(data: Date) {
    const inicio = new Date(data.getFullYear(), data.getMonth(), 1, 0, 0, 0, 0);
    const fim = new Date(data.getFullYear(), data.getMonth() + 1, 0, 23, 59, 59, 999);
    return { inicio, fim };
  }

  async resumo() {
    const hoje = new Date();
    const { inicio: inicioDia, fim: fimDia } = this.limitesDoDia(hoje);
    const { inicio: inicioMes, fim: fimMes } = this.limitesDoMes(hoje);

    const agendamentosHoje = await this.prisma.agendamento.findMany({
      where: { dataHora: { gte: inicioDia, lte: fimDia } },
      orderBy: { dataHora: 'asc' },
      include: { ficha: { include: { paciente: true, profissional: true } } },
    });

    const porStatus = { AGENDADO: 0, CONFIRMADO: 0, CANCELADO: 0, REALIZADO: 0 };
    agendamentosHoje.forEach((a) => {
      porStatus[a.status] = (porStatus[a.status] || 0) + 1;
    });

    const atendimentosHoje = await this.prisma.atendimento.findMany({
      where: { data: { gte: inicioDia, lte: fimDia } },
    });
    const faturamentoHoje = atendimentosHoje.reduce((soma, a) => soma + Number(a.valor || 0), 0);

    const atendimentosMes = await this.prisma.atendimento.findMany({
      where: { data: { gte: inicioMes, lte: fimMes } },
    });
    const faturamentoMes = atendimentosMes.reduce((soma, a) => soma + Number(a.valor || 0), 0);

    const totalPacientes = await this.prisma.paciente.count();
    const totalProfissionais = await this.prisma.profissional.count();

    return {
      agendamentosHoje,
      totalAgendamentosHoje: agendamentosHoje.length,
      porStatus,
      faturamentoHoje,
      faturamentoMes,
      totalPacientes,
      totalProfissionais,
    };
  }
}
