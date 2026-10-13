import {
  IsNotEmpty,
  IsString,
  IsNumber
} from 'class-validator';

export class CriarCategoriaDto {
  @IsNumber()
  @IsNotEmpty()
  id_categoria: number;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;
}