import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEnum } from 'class-validator';
import { TipoUsuario } from './enums/tipo-usuario.enum';

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
  tipo_usuario: TipoUsuario;

  @Column({ default: true })
  ativo: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data_cadastro: Date;
}
