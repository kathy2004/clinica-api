import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AgendamentosService } from './agendamentos.service';

@Controller('agendamentos')
@UseGuards(AuthGuard('jwt'))
export class AgendamentosController {
  constructor(private readonly agendamentosService: AgendamentosService) {}

  @Post()
  criar(@Body() dados: { fichaId: string; dataHora: string; observacoes?: string }) {
    return this.agendamentosService.criar(dados);
  }

  @Get('ficha/:fichaId')
  listarPorFicha(@Param('fichaId') fichaId: string) {
    return this.agendamentosService.listarPorFicha(fichaId);
  }

  // GET /agendamentos?data=2026-08-30
    @Get()
  listarPorDia(@Query('data') data: string) {
    const hoje = new Date();
    const dataBase =
      data || `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
    const [ano, mes, dia] = dataBase.split('-').map(Number);
    const dataInicio = new Date(ano, mes - 1, dia, 0, 0, 0, 0);
    const dataFim = new Date(ano, mes - 1, dia, 23, 59, 59, 999);
    return this.agendamentosService.listarPorDia(dataInicio, dataFim);
  }

  @Patch(':id/status')
  atualizarStatus(
    @Param('id') id: string,
    @Body() dados: { status: 'AGENDADO' | 'CONFIRMADO' | 'CANCELADO' | 'REALIZADO' },
  ) {
    return this.agendamentosService.atualizarStatus(id, dados.status);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() dados: { dataHora?: string; observacoes?: string }) {
    return this.agendamentosService.atualizar(id, dados);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.agendamentosService.remover(id);
  }
}