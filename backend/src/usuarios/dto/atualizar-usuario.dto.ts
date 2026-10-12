import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';
import { TipoUsuario } from '../enums/tipo-usuario.enum';

export class AtualizarUsuarioDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  senha?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsEnum(TipoUsuario)
  tipo_usuario?: TipoUsuario;

  @IsOptional()
  ativo?: boolean;
}