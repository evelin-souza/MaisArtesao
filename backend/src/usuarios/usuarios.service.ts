import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repository: Repository<Usuario>,
  ) {}

  private removerSenha(usuario: Usuario) {
    return {
      id_usuario: usuario.id_usuario,
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone,
      tipo_usuario: usuario.tipo_usuario,
      ativo: usuario.ativo,
      data_cadastro: usuario.data_cadastro,
    };
  }

  async listar() {
    const usuarios = await this.repository.find({
      order: {
        id_usuario: 'ASC',
      },
    });

    return usuarios.map((usuario) =>
      this.removerSenha(usuario),
    );
  }

  async buscarPorId(id_usuario: number) {
    const usuario = await this.repository.findOneBy({
      id_usuario,
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.removerSenha(usuario);
  }

  async buscarPorEmail(email: string) {
    return this.repository.findOneBy({
      email,
    });
  }

  async criar(dto: CriarUsuarioDto) {
    const usuarioExistente = await this.repository.findOneBy({
        email: dto.email,
    });

    if (usuarioExistente) {
        throw new ConflictException('E-mail já cadastrado');
    }

    const senhaHash = await bcrypt.hash(dto.senha, 10);

    const usuario = this.repository.create({
        nome: dto.nome,
        email: dto.email,
        senha_hash: senhaHash,
        telefone: dto.telefone,
        tipo_usuario: dto.tipo_usuario,
        ativo: true,
    });

    const usuarioSalvo = await this.repository.save(usuario);
    
    return this.removerSenha(usuarioSalvo);
}

  async atualizar(id_usuario: number, dto: AtualizarUsuarioDto) {
    const usuario = await this.repository.findOneBy({
      id_usuario,
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (dto.email && dto.email !== usuario.email) {
      const usuarioExistente = await this.repository.findOneBy({
        email: dto.email,
      });

      if (usuarioExistente) {
        throw new ConflictException('E-mail já cadastrado');
      }
    }

    if (dto.nome !== undefined) {
      usuario.nome = dto.nome;
    }

    if (dto.email !== undefined) {
      usuario.email = dto.email;
    }

    if (dto.telefone !== undefined) {
      usuario.telefone = dto.telefone;
    }

    if (dto.tipo_usuario !== undefined) {
      usuario.tipo_usuario = dto.tipo_usuario;
    }

    if (dto.senha !== undefined) {
      usuario.senha_hash = await bcrypt.hash(dto.senha, 10);
    }

    const usuarioAtualizado = await this.repository.save(usuario);

    return this.removerSenha(usuarioAtualizado);
  }

  async desativar(id_usuario: number) {
    const usuario = await this.repository.findOneBy({
      id_usuario,
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    usuario.ativo = false;

    const usuarioAtualizado = await this.repository.save(usuario);

    return this.removerSenha(usuarioAtualizado);
  }
}