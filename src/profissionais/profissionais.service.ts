import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfissionaisService {
  constructor(private prisma: PrismaService) {}

  criar(dados: { nome: string; especialidade?: string; registroConselho?: string }) {
    return this.prisma.profissional.create({ data: dados });
  }

  listarTodos() {
    return this.prisma.profissional.findMany();
  }

  buscarPorId(id: string) {
    return this.prisma.profissional.findUnique({ where: { id } });
  }

  atualizar(
    id: string,
    dados: { nome?: string; especialidade?: string; registroConselho?: string },
  ) {
    return this.prisma.profissional.update({ where: { id }, data: dados });
  }

  async remover(id: string) {
    const fichasVinculadas = await this.prisma.ficha.count({ where: { profissionalId: id } });
    if (fichasVinculadas > 0) {
      throw new ConflictException(
        'Não é possível excluir: este profissional tem pacientes vinculados.',
      );
    }
    return this.prisma.profissional.delete({ where: { id } });
  }

  listarPacientes(profissionalId: string) {
    return this.prisma.ficha.findMany({
      where: { profissionalId },
      include: { paciente: true },
    });
  }
}