import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AtendimentosService {
  constructor(private prisma: PrismaService) {}

  criar(dados: {
    fichaId: string;
    data: string;
    assinatura?: string;
    valor?: number;
  }) {
    return this.prisma.atendimento.create({
      data: {
        fichaId: dados.fichaId,
        data: new Date(dados.data),
        assinatura: dados.assinatura,
        valor: dados.valor,
      },
    });
  }

  listarPorFicha(fichaId: string) {
    return this.prisma.atendimento.findMany({
      where: { fichaId },
      orderBy: { data: 'asc' },
    });
  }

  buscarPorId(id: string) {
    return this.prisma.atendimento.findUnique({ where: { id } });
  }

  atualizar(id: string, dados: { data?: string; assinatura?: string; valor?: number }) {
    return this.prisma.atendimento.update({
      where: { id },
      data: {
        ...dados,
        data: dados.data ? new Date(dados.data) : undefined,
      },
    });
  }

  remover(id: string) {
    return this.prisma.atendimento.delete({ where: { id } });
  }
}