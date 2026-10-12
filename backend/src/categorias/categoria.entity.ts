
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ unique: true })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

 
}
