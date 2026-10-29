
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Artesao } from './artesao.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { CriarArtesaoDto } from './dto/criar-artesao.dto';
import { AtualizarArtesaoDto } from './dto/atualizar-artesao.dto';
import { TipoUsuario } from '../usuarios/enums/tipo-usuario.enum';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class ArtesaoService {
  constructor(
    @InjectRepository(Artesao)
    private readonly artesaoRepository: Repository<Artesao>,

    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,

    private readonly usuariosService: UsuariosService,
  ) {}

  private respostaPublica(artesao: Artesao) {
    return {
      id_artesao: artesao.id_artesao,
      id_usuario: artesao.usuario.id_usuario,
      especialidade: artesao.especialidade,
      usuario: {
        id_usuario: artesao.usuario.id_usuario,
        nome: artesao.usuario.nome,
        email: artesao.usuario.email,
        telefone: artesao.usuario.telefone,
      },
    };
  }

  async criar(dto: CriarArtesaoDto) {
    // Cria o usuário com perfil definido pelo backend.
    const usuario = await this.usuariosService.criarArtesao({
      nome: dto.nome,
      email: dto.email,
      senha: dto.senha,
      telefone: dto.telefone,
      cpf: dto.cpf,
      endereco: dto.endereco,
    });

    // Recupera a entidade para criar o relacionamento.
    const usuarioEntity = await this.usuariosRepository.findOneBy({
      id_usuario: usuario.id_usuario,
    });

    if (!usuarioEntity) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const artesao = this.artesaoRepository.create({
      usuario: usuarioEntity,
      especialidade: dto.especialidade,
    });

    const artesaoSalvo =
      await this.artesaoRepository.save(artesao);

    return {
      id_artesao: artesaoSalvo.id_artesao,
      id_usuario: usuarioEntity.id_usuario,
      nome: usuarioEntity.nome,
      email: usuarioEntity.email,
      telefone: usuarioEntity.telefone,
      especialidade: artesaoSalvo.especialidade,
      tipo_usuario: TipoUsuario.ARTESAO,
    };
  }

  async listar() {
    const artesoes = await this.artesaoRepository.find({
      relations: { usuario: true },
      order: { id_artesao: 'ASC' },
    });

    return artesoes.map((artesao) =>
      this.respostaPublica(artesao),
    );
  }

  async buscarPorUsuarioId(idUsuario: number) {
    const artesao = await this.artesaoRepository.findOne({
      where: {
        usuario: { id_usuario: idUsuario },
      },
      relations: { usuario: true },
    });

    if (!artesao) {
      throw new NotFoundException(
        'Cadastro de artesão não encontrado',
      );
    }

    return this.respostaPublica(artesao);
  }

  async atualizarMeuPerfil(
    idUsuario: number,
    dto: AtualizarArtesaoDto,
  ) {
    const artesao = await this.artesaoRepository.findOne({
      where: {
        usuario: { id_usuario: idUsuario },
      },
      relations: { usuario: true },
    });

    if (!artesao) {
      throw new NotFoundException(
        'Cadastro de artesão não encontrado',
      );
    }

    if (dto.especialidade !== undefined) {
      artesao.especialidade = dto.especialidade;
    }

    if (dto.telefone !== undefined) {
      artesao.usuario.telefone = dto.telefone;
      await this.usuariosRepository.save(artesao.usuario);
    }

    if (dto.especialidade !== undefined) {
      await this.artesaoRepository.save(artesao);
    }

    return this.buscarPorUsuarioId(idUsuario);
  }
}
