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
import { ArtesaoModule } from './artesaos/artesaos.module';
import { Pagamento } from './pagamentos/pagamento.entity';
import { Cliente } from './clientes/cliente.entity';
import { MovimentacaoEstoque } from './movimentacao-estoque/movimentacao-estoque.entity';
import { ItemVenda } from './vendas/item-venda.entity';
import { Venda } from './vendas/venda.entity';
import { MovimentacaoEstoqueModule } from './movimentacao-estoque/movimentacao-estoque.module';
import { VendasModule } from './vendas/vendas.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Usuario, Produto, Categoria, Artesao, MovimentacaoEstoque, ItemVenda, Venda, Cliente, Pagamento],
      synchronize: false,
    }),
    UsuariosModule,
    AuthModule,
    ProdutosModule,
    CategoriasModule,
    ArtesaoModule,
    MovimentacaoEstoqueModule,
    VendasModule,
    PagamentosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}