
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsPositive,
  IsOptional,
  Min,
} from 'class-validator';

export class AtualizarProdutoDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsOptional()
  preco?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  quantidade_estoque?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  id_artesao?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  id_categoria?: number;

  @IsOptional()
  @IsString()
  imagem_url?: string;
}
