import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(usuario: string, senha: string) {
    const secretaria = await this.prisma.secretaria.findUnique({ where: { usuario } });
    if (!secretaria) throw new UnauthorizedException('Usuário ou senha inválidos');

    const senhaValida = await bcrypt.compare(senha, secretaria.senhaHash);
    if (!senhaValida) throw new UnauthorizedException('Usuário ou senha inválidos');

    const token = this.jwtService.sign({ sub: secretaria.id, usuario: secretaria.usuario });
    return { access_token: token };
  }
}