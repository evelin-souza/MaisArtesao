
import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ArtesaoService } from './artesaos.service';
import { CriarArtesaoDto } from './dto/criar-artesao.dto';
import { AtualizarArtesaoDto } from './dto/atualizar-artesao.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

interface RequestAutenticado extends Request {
  user: {
    id_usuario: number;
    email: string;
    tipo_usuario: string;
  };
}

@Controller('artesaos')
export class ArtesaoController {
  constructor(
    private readonly artesaoService: ArtesaoService,
  ) {}

  @Post()
  criar(@Body() dto: CriarArtesaoDto) {
    return this.artesaoService.criar(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  listar() {
    return this.artesaoService.listar();
  }

  @Get('me')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ARTESAO')
    meuPerfil(@Req() req: RequestAutenticado) {
    return this.artesaoService.buscarPorUsuarioId(
        req.user.id_usuario,
    );
  }

  @Patch('me')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ARTESAO')
    atualizarMeuPerfil(
    @Req() req: RequestAutenticado,
    @Body() dto: AtualizarArtesaoDto,
    ) {
    return this.artesaoService.atualizarMeuPerfil(
        req.user.id_usuario,
        dto,
    );
}
}
