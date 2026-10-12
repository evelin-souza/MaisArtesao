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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Usuario, Produto, Categoria],
      synchronize: true,
    }),
    UsuariosModule,
    AuthModule,
    ProdutosModule,
    CategoriasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}