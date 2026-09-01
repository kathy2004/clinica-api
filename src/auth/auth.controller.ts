import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dados: { usuario: string; senha: string }) {
    return this.authService.login(dados.usuario, dados.senha);
  }
}