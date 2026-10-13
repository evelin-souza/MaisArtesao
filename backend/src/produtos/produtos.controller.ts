import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ProdutosService } from './produtos.service';
import { CriarProdutoDto } from './dto/criar-produto.dto';
import { AtualizarProdutoDto } from './dto/atualizar-produto.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('produtos')
export class ProdutosController {
  constructor(
    private readonly service: ProdutosService,
  ) {}

  @Get()
  listar() {
    return this.service.listar();
  }

  @Get(':id')
  buscarPorId(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.buscarPorId(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ARTESAO', 'ADMIN')
  @Post()
  criar(@Body() dto: CriarProdutoDto) {
    return this.service.criar(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ARTESAO', 'ADMIN')
  @Patch(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AtualizarProdutoDto,
  ) {
    return this.service.atualizar(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ARTESAO', 'ADMIN')
  @Patch(':id/desativar')
  desativar(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.desativar(id);
  }
}