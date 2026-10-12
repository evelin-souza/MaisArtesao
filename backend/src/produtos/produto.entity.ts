
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Usuario } from '../usuarios/usuario.entity';
import { Categoria } from '../categorias/categoria.entity';

@Entity('produto')
export class Produto {
  @PrimaryGeneratedColumn()
  id_produto: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({
    name: 'id_artesao',
    referencedColumnName: 'id_usuario',
  })
  artesao: Usuario;

  @ManyToOne(() => Categoria)
  @JoinColumn({
    name: 'id_categoria',
    referencedColumnName: 'id_categoria',
  })
  categoria: Categoria;

  @Column()
  nome: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco: string;

  @Column({ type: 'integer', default: 0 })
  quantidade_estoque: number;

  @Column({ nullable: true })
  imagem_url: string;

  @Column({ default: 'ativo' })
  status: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  data_cadastro: Date;
}
