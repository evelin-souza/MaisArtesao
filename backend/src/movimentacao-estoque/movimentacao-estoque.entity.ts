import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Produto } from '../produtos/produto.entity';

@Entity('movimentacao_estoque')
export class MovimentacaoEstoque {
  @PrimaryGeneratedColumn({ name: 'id_movimentacao' })
  idMovimentacao: number;

  @Column({ name: 'id_produto', type: 'int' })
  idProduto: number;

  @Column({ name: 'tipo_movimentacao', type: 'varchar', length: 20 })
  tipoMovimentacao: string; // Ex: 'ENTRADA' ou 'SAIDA'

  @Column({ type: 'int' })
  quantidade: number;

  @Column({
    name: 'data_movimentacao',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dataMovimentacao: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  motivo: string;

  // Relacionamento com Produto
  @ManyToOne(() => Produto, (produto) => produto.movimentacoesEstoque, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_produto' })
  produto: Produto;
}