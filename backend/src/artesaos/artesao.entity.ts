import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';

@Entity('artesao')
export class Artesao {
  @PrimaryGeneratedColumn({ name: 'id_artesao' })
  id_artesao: number;

  @Column({ name: 'id_usuario', unique: true })
  id_usuario: number;

  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id_usuario' })
  usuario: Usuario;

  @Column({ unique: true, length: 11 })
  cpf: string;

  @Column()
  endereco: string;

  @Column()
  especialidade: string;
}
