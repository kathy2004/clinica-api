import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PacientesService {
  constructor(private prisma: PrismaService) {}

  criar(dados: {
    nome: string;
    cpf?: string;
    sexo?: string;
    dataNascimento?: string;
    naturalidade?: string;
    endereco?: string;
    numero?: string;
    cidade?: string;
    telefone?: string;
  }) {
    return this.prisma.paciente.create({
      data: {
        ...dados,
        dataNascimento: dados.dataNascimento ? new Date(dados.dataNascimento) : undefined,
      },
    });
  }

  listarTodos() {
    return this.prisma.paciente.findMany();
  }

  buscarPorId(id: string) {
    return this.prisma.paciente.findUnique({ where: { id } });
  }

  atualizar(id: string, dados: Partial<{
    nome: string;
    cpf: string;
    sexo: string;
    dataNascimento: string;
    naturalidade: string;
    endereco: string;
    numero: string;
    cidade: string;
    telefone: string;
  }>) {
    return this.prisma.paciente.update({
      where: { id },
      data: {
        ...dados,
        dataNascimento: dados.dataNascimento ? new Date(dados.dataNascimento) : undefined,
      },
    });
  }

  async remover(id: string) {
    const fichasVinculadas = await this.prisma.ficha.count({ where: { pacienteId: id } });
    if (fichasVinculadas > 0) {
      throw new ConflictException(
        'Não é possível excluir: este paciente tem fichas vinculadas a profissionais.',
      );
    }
    return this.prisma.paciente.delete({ where: { id } });
  }

  vincularProfissional(pacienteId: string, profissionalId: string) {
    return this.prisma.ficha.create({
      data: { pacienteId, profissionalId },
    });
  }

  async removerFicha(fichaId: string) {
    const atendimentosVinculados = await this.prisma.atendimento.count({ where: { fichaId } });
    if (atendimentosVinculados > 0) {
      throw new ConflictException(
        'Não é possível remover: este paciente já tem atendimentos registrados com este profissional.',
      );
    }
    return this.prisma.ficha.delete({ where: { id: fichaId } });
  }

  listarFichas(pacienteId: string) {
    return this.prisma.ficha.findMany({
      where: { pacienteId },
      include: { profissional: true },
    });
  }
}