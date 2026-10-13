import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class AtualizarArtesaoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  especialidade: string;
}
