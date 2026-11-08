import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { Artesao } from '../artesaos/artesao.entity';
import { ItemVenda } from './item-venda.entity';
import { Pagamento } from '../pagamentos/pagamento.entity';

@Entity('venda')
export class Venda {
  @PrimaryGeneratedColumn({ name: 'id_venda' })
  idVenda: number;

  @Column({ name: 'id_cliente', type: 'int' })
  idCliente: number;

  @Column({ name: 'id_artesao', type: 'int' })
  idArtesao: number;

  @Column({
    name: 'data_venda',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dataVenda: Date;

  @Column({ name: 'valor_total', type: 'decimal', precision: 10, scale: 2 })
  valorTotal: number;

  @Column({ type: 'varchar', length: 20, default: 'CONCLUIDA' })
  status: string;

  // Relacionamentos
  @ManyToOne(() => Cliente, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @ManyToOne(() => Artesao, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'id_artesao' })
  artesao: Artesao;

  @OneToMany(() => ItemVenda, (itemVenda) => itemVenda.venda, { cascade: true })
  itens: ItemVenda[];

  @OneToMany(() => Pagamento, (pagamento) => pagamento.venda, { cascade: true })
  pagamentos: Pagamento[];
}