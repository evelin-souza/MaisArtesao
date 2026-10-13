import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  RelationId
} from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';

@Entity('artesao')
export class Artesao {
  @PrimaryGeneratedColumn({ name: 'id_artesao' })
  id_artesao: number;

  @RelationId((artesao: Artesao) => artesao.usuario)
  id_usuario: number;

  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id_usuario' })
  usuario: Usuario;

  @Column()
  especialidade: string;
}
