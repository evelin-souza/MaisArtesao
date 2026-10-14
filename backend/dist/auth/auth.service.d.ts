import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
export declare class AuthService {
    private readonly usuariosService;
    private readonly jwtService;
    constructor(usuariosService: UsuariosService, jwtService: JwtService);
    validarUsuario(email: string, senha: string): Promise<import("../usuarios/usuario.entity").Usuario>;
    login(email: string, senha: string): Promise<{
        access_token: string;
    }>;
}
