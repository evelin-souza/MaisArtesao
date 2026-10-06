import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';
import { TipoUsuario } from '../enums/tipo-usuario.enum';

export class CriarUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  senha: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;

  @IsEnum(TipoUsuario)
  @IsNotEmpty()
  tipo_usuario: TipoUsuario;
}