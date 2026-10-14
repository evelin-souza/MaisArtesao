import { UsuariosService } from './usuarios.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';
export declare class UsuariosController {
    private readonly service;
    constructor(service: UsuariosService);
    listar(): Promise<{
        id_usuario: number;
        nome: string;
        email: string;
        telefone: string;
        tipo_usuario: import("./enums/tipo-usuario.enum").TipoUsuario;
        ativo: boolean;
        data_cadastro: Date;
    }[]>;
    buscarPorId(id: number): Promise<{
        id_usuario: number;
        nome: string;
        email: string;
        telefone: string;
        tipo_usuario: import("./enums/tipo-usuario.enum").TipoUsuario;
        ativo: boolean;
        data_cadastro: Date;
    }>;
    criar(dto: CriarUsuarioDto): Promise<{
        id_usuario: number;
        nome: string;
        email: string;
        telefone: string;
        tipo_usuario: import("./enums/tipo-usuario.enum").TipoUsuario;
        ativo: boolean;
        data_cadastro: Date;
    }>;
    atualizar(id: number, dto: AtualizarUsuarioDto): Promise<{
        id_usuario: number;
        nome: string;
        email: string;
        telefone: string;
        tipo_usuario: import("./enums/tipo-usuario.enum").TipoUsuario;
        ativo: boolean;
        data_cadastro: Date;
    }>;
    desativar(id: number): Promise<{
        id_usuario: number;
        nome: string;
        email: string;
        telefone: string;
        tipo_usuario: import("./enums/tipo-usuario.enum").TipoUsuario;
        ativo: boolean;
        data_cadastro: Date;
    }>;
}
