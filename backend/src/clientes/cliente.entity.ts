import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
// Importaremos a Venda assim que criarmos a entidade Venda
// import { Venda } from '../vendas/venda.entity';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn({ name: 'id_cliente' })
  idCliente: number;

  @Column({ name: 'id_usuario', type: 'int' })
  idUsuario: number;

  @Column({ type: 'varchar', length: 14, unique: true })
  cpf: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  endereco: string;

  @OneToOne(() => Usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  // Relacionamento com Venda (descomentar após criar a entidade Venda)
  // @OneToMany(() => Venda, (venda) => venda.cliente)
  // vendas: Venda[];
}