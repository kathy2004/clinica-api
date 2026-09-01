import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AtendimentosService } from './atendimentos.service';

@Controller('atendimentos')
@UseGuards(AuthGuard('jwt'))
export class AtendimentosController {
  constructor(private readonly atendimentosService: AtendimentosService) {}

  @Post()
  criar(@Body() dados: { fichaId: string; data: string; assinatura?: string; valor?: number }) {
    return this.atendimentosService.criar(dados);
  }

  @Get('ficha/:fichaId')
  listarPorFicha(@Param('fichaId') fichaId: string) {
    return this.atendimentosService.listarPorFicha(fichaId);
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.atendimentosService.buscarPorId(id);
  }

  @Patch(':id')
  atualizar(
    @Param('id') id: string,
    @Body() dados: { data?: string; assinatura?: string; valor?: number },
  ) {
    return this.atendimentosService.atualizar(id, dados);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.atendimentosService.remover(id);
  }
}