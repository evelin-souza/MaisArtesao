import { IsOptional, IsString, MaxLength } from 'class-validator';

export class AtualizarArtesaoDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  especialidade?: string;

  @IsOptional()
  @IsString()
  telefone?: string;
}