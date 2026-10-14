import { TipoUsuario } from '../enums/tipo-usuario.enum';
export declare class AtualizarUsuarioDto {
    nome?: string;
    email?: string;
    senha?: string;
    telefone?: string;
    tipo_usuario?: TipoUsuario;
    ativo?: boolean;
}
