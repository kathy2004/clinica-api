import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProfissionaisModule } from './profissionais/profissionais.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { AtendimentosModule } from './atendimentos/atendimentos.module';
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ProfissionaisModule,
    PacientesModule,
    AtendimentosModule,
    AgendamentosModule,
    DashboardModule,
  ],
})
export class AppModule {}