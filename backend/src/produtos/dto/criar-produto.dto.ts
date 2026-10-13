import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CriarProdutoDto {
  @IsInt()
  @Min(1)
  id_artesao: number;

  @IsInt()
  @Min(1)
  id_categoria: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nome: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  descricao: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  preco: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  quantidade_estoque: number;

  @IsOptional()
  @IsString()
  @IsUrl({ require_protocol: true })
  imagem_url?: string;
}