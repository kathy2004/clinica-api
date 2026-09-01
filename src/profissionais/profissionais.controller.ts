import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProfissionaisService } from './profissionais.service';

@Controller('profissionais')
@UseGuards(AuthGuard('jwt'))
export class ProfissionaisController {
  constructor(private readonly profissionaisService: ProfissionaisService) {}

  @Post()
  criar(@Body() dados: { nome: string; especialidade?: string; registroConselho?: string }) {
    return this.profissionaisService.criar(dados);
  }

  @Get()
  listarTodos() {
    return this.profissionaisService.listarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.profissionaisService.buscarPorId(id);
  }

  @Patch(':id')
  atualizar(
    @Param('id') id: string,
    @Body() dados: { nome?: string; especialidade?: string; registroConselho?: string },
  ) {
    return this.profissionaisService.atualizar(id, dados);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.profissionaisService.remover(id);
  }

  @Get(':id/pacientes')
  listarPacientes(@Param('id') id: string) {
    return this.profissionaisService.listarPacientes(id);
  }
}