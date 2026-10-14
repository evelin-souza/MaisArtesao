import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';
export declare class UsuariosService {
    private readonly repository;
    constructor(repository: Repository<Usuario>);
    private removerSenha;
    listar(): Promise<{
        id_usuario: number;
        nome: string;
        email: string;
        telefone: string;
        tipo_usuario: import("./enums/tipo-usuario.enum").TipoUsuario;
        ativo: boolean;
        data_cadastro: Date;
    }[]>;
    buscarPorId(id_usuario: number): Promise<{
        id_usuario: number;
        nome: string;
        email: string;
        telefone: string;
        tipo_usuario: import("./enums/tipo-usuario.enum").TipoUsuario;
        ativo: boolean;
        data_cadastro: Date;
    }>;
    buscarPorEmail(email: string): Promise<Usuario | null>;
    criar(dto: CriarUsuarioDto): Promise<{
        id_usuario: number;
        nome: string;
        email: string;
        telefone: string;
        tipo_usuario: import("./enums/tipo-usuario.enum").TipoUsuario;
        ativo: boolean;
        data_cadastro: Date;
    }>;
    atualizar(id_usuario: number, dto: AtualizarUsuarioDto): Promise<{
        id_usuario: number;
        nome: string;
        email: string;
        telefone: string;
        tipo_usuario: import("./enums/tipo-usuario.enum").TipoUsuario;
        ativo: boolean;
        data_cadastro: Date;
    }>;
    desativar(id_usuario: number): Promise<{
        id_usuario: number;
        nome: string;
        email: string;
        telefone: string;
        tipo_usuario: import("./enums/tipo-usuario.enum").TipoUsuario;
        ativo: boolean;
        data_cadastro: Date;
    }>;
}
