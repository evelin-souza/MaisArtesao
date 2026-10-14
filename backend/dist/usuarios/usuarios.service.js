"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usuario_entity_1 = require("./usuario.entity");
const bcrypt = __importStar(require("bcrypt"));
let UsuariosService = class UsuariosService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    removerSenha(usuario) {
        return {
            id_usuario: usuario.id_usuario,
            nome: usuario.nome,
            email: usuario.email,
            telefone: usuario.telefone,
            tipo_usuario: usuario.tipo_usuario,
            ativo: usuario.ativo,
            data_cadastro: usuario.data_cadastro,
        };
    }
    async listar() {
        const usuarios = await this.repository.find({
            order: {
                id_usuario: 'ASC',
            },
        });
        return usuarios.map((usuario) => this.removerSenha(usuario));
    }
    async buscarPorId(id_usuario) {
        const usuario = await this.repository.findOneBy({
            id_usuario,
        });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        return this.removerSenha(usuario);
    }
    async buscarPorEmail(email) {
        return this.repository.findOneBy({
            email,
        });
    }
    async criar(dto) {
        const usuarioExistente = await this.repository.findOneBy({
            email: dto.email,
        });
        if (usuarioExistente) {
            throw new common_1.ConflictException('E-mail já cadastrado');
        }
        const senhaHash = await bcrypt.hash(dto.senha, 10);
        const usuario = this.repository.create({
            nome: dto.nome,
            email: dto.email,
            senha_hash: senhaHash,
            telefone: dto.telefone,
            tipo_usuario: dto.tipo_usuario,
            ativo: true,
        });
        const usuarioSalvo = await this.repository.save(usuario);
        return this.removerSenha(usuarioSalvo);
    }
    async atualizar(id_usuario, dto) {
        const usuario = await this.repository.findOneBy({
            id_usuario,
        });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        if (dto.email && dto.email !== usuario.email) {
            const usuarioExistente = await this.repository.findOneBy({
                email: dto.email,
            });
            if (usuarioExistente) {
                throw new common_1.ConflictException('E-mail já cadastrado');
            }
        }
        if (dto.nome !== undefined) {
            usuario.nome = dto.nome;
        }
        if (dto.email !== undefined) {
            usuario.email = dto.email;
        }
        if (dto.telefone !== undefined) {
            usuario.telefone = dto.telefone;
        }
        if (dto.tipo_usuario !== undefined) {
            usuario.tipo_usuario = dto.tipo_usuario;
        }
        if (dto.senha !== undefined) {
            usuario.senha_hash = await bcrypt.hash(dto.senha, 10);
        }
        const usuarioAtualizado = await this.repository.save(usuario);
        return this.removerSenha(usuarioAtualizado);
    }
    async desativar(id_usuario) {
        const usuario = await this.repository.findOneBy({
            id_usuario,
        });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        usuario.ativo = false;
        const usuarioAtualizado = await this.repository.save(usuario);
        return this.removerSenha(usuarioAtualizado);
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map