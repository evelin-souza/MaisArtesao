import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional
} from 'class-validator';

export class AtualizarCategoriaDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  descricao?: string;
}