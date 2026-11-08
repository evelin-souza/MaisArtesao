import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Venda } from '../vendas/venda.entity';

@Entity('pagamento')
export class Pagamento {
  @PrimaryGeneratedColumn({ name: 'id_pagamento' })
  idPagamento: number;

  @Column({ name: 'id_venda', type: 'int' })
  idVenda: number;

  @Column({ name: 'forma_pagamento', type: 'varchar', length: 30 })
  formaPagamento: string; // Ex: 'PIX', 'DINHEIRO', 'CARTAO_CREDITO'

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @Column({
    name: 'data_pagamento',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dataPagamento: Date;

  @Column({ type: 'varchar', length: 20, default: 'APROVADO' })
  status: string;

  // Relacionamento com Venda
  @ManyToOne(() => Venda, (venda) => venda.pagamentos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_venda' })
  venda: Venda;
}