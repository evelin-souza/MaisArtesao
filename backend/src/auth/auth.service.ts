import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validarUsuario(email: string, senha: string) {
    const usuario = await this.usuariosService.buscarPorEmail(email);

    if (!usuario) {
      throw new UnauthorizedException(
        'E-mail ou senha inválidos',
      );
    }

    if (!usuario.ativo) {
      throw new UnauthorizedException(
        'Usuário inativo',
      );
    }

    const senhaValida = await bcrypt.compare(
      senha,
      usuario.senha_hash,
    );

    if (!senhaValida) {
      throw new UnauthorizedException(
        'E-mail ou senha inválidos',
      );
    }

    return usuario;
  }

  async login(email: string, senha: string) {
    const usuario = await this.validarUsuario(email, senha);

    const payload = {
      sub: usuario.id_usuario,
      email: usuario.email,
      tipo_usuario: usuario.tipo_usuario,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}