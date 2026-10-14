import { TipoUsuario } from './enums/tipo-usuario.enum';
export declare class Usuario {
    id_usuario: number;
    nome: string;
    email: string;
    senha_hash: string;
    telefone: string;
    tipo_usuario: TipoUsuario;
    ativo: boolean;
    data_cadastro: Date;
}
