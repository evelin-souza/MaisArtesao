import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Usuario } from './usuarios/usuario.entity';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { Produto } from './produtos/produto.entity';
import { Categoria } from './categorias/categoria.entity';
import { ProdutosModule } from './produtos/produtos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { Artesao } from './artesaos/artesao.entity';
import { ArtesaoService } from './artesaos/artesaos.service';
import { ArtesaoModule } from './artesaos/artesaos.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Usuario, Produto, Categoria, Artesao],
      synchronize: true,
    }),
    UsuariosModule,
    AuthModule,
    ProdutosModule,
    CategoriasModule,
    ArtesaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}