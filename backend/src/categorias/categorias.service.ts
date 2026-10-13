import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { CriarCategoriaDto } from './dto/criar-categoria.dto';
import { AtualizarCategoriaDto } from './dto/atualizar-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly repository: Repository<Categoria>,
  ) {}

  async criar(dto: CriarCategoriaDto) {
    const existente = await this.repository.findOne({
      where: { nome: dto.nome },
    });

    if (existente) {
      throw new ConflictException('Categoria já cadastrada');
    }

    const categoria = this.repository.create(dto);
    return this.repository.save(categoria);
  }

  async listar() {
    return this.repository.find();
  }

  async buscarPorId(id: number) {
    const categoria = await this.repository.findOne({
      where: { id_categoria: id },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return categoria;
  }

  async atualizar(id: number, dto: AtualizarCategoriaDto) {
    const categoria = await this.buscarPorId(id);

    Object.assign(categoria, dto);

    return this.repository.save(categoria);
  }
}