
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsPositive,
  IsOptional,
  Min,
} from 'class-validator';

export class CriarProdutoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  preco: number;

  @IsInt()
  @Min(0)
  quantidade_estoque: number;

  @IsInt()
  @IsPositive()
  id_artesao: number;

  @IsInt()
  @IsPositive()
  id_categoria: number;

  @IsOptional()
  @IsString()
  imagem_url?: string;
}
