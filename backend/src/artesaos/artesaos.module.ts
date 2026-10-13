import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artesao } from './artesao.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { ArtesaoController } from './artesaos.controller';
import { ArtesaoService } from './artesaos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Artesao, Usuario]),
    UsuariosModule,
  ],
  controllers: [ArtesaoController],
  providers: [ArtesaoService],
  exports: [ArtesaoService],
})
export class ArtesaoModule {}
