import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha_hash: string;

  @Column()
  telefone: string;

  @Column()
  tipo_usuario: string;

  @Column({ default: true })
  ativo: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data_cadastro: Date;
}
