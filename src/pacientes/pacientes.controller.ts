import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PacientesService } from './pacientes.service';

@Controller('pacientes')
@UseGuards(AuthGuard('jwt'))
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  criar(@Body() dados: any) {
    return this.pacientesService.criar(dados);
  }

  @Get()
  listarTodos() {
    return this.pacientesService.listarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.pacientesService.buscarPorId(id);
  }

  @Get(':id/fichas')
  listarFichas(@Param('id') id: string) {
    return this.pacientesService.listarFichas(id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() dados: any) {
    return this.pacientesService.atualizar(id, dados);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.pacientesService.remover(id);
  }

  @Post(':id/vincular/:profissionalId')
  vincular(@Param('id') id: string, @Param('profissionalId') profissionalId: string) {
    return this.pacientesService.vincularProfissional(id, profissionalId);
  }

  @Delete('ficha/:fichaId')
  removerFicha(@Param('fichaId') fichaId: string) {
    return this.pacientesService.removerFicha(fichaId);
  }
}