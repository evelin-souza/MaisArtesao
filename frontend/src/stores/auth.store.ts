
import { defineStore } from 'pinia'
import axios from 'axios'
import { api } from '@/services/api'

export type UserType = 'ADMIN' | 'ARTESAO' | 'CLIENTE'

export interface User {
  id: string
  email: string
  nome: string
  tipo: UserType
}

interface LoginResponse {
  access_token: string
  user: {
    id_usuario: number
    email: string
    nome: string
    tipo_usuario: UserType
  }
}

interface UsuarioResponse {
  id_usuario: number
  email: string
  nome: string
  tipo_usuario: UserType
}

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(
      localStorage.getItem(USER_KEY) || 'null',
    ) as User | null,

    token: localStorage.getItem(TOKEN_KEY) || '',

    users: [] as User[],
  }),

  actions: {
    async login(email: string, senha: string) {
      try {
        const response = await api.post<LoginResponse>(
          '/auth/login',
          {
            email: email.trim(),
            senha,
          },
        )

        const dados = response.data

        const safeUser: User = {
          id: String(dados.user.id_usuario),
          nome: dados.user.nome,
          email: dados.user.email,
          tipo: dados.user.tipo_usuario,
        }

        this.token = dados.access_token
        this.user = safeUser

        localStorage.setItem(TOKEN_KEY, dados.access_token)
        localStorage.setItem(USER_KEY, JSON.stringify(safeUser))
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const mensagem = error.response?.data?.message

          throw new Error(
            typeof mensagem === 'string'
              ? mensagem
              : 'Não foi possível entrar. Verifique suas credenciais.',
          )
        }

        throw error
      }
    },

    async fetchUsers() {
      try {
        const response = await api.get<UsuarioResponse[]>('/usuarios')

        this.users = response.data.map(usuario => ({
          id: String(usuario.id_usuario),
          nome: usuario.nome,
          email: usuario.email,
          tipo: usuario.tipo_usuario,
        }))
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const mensagem = error.response?.data?.message

          throw new Error(
            typeof mensagem === 'string'
              ? mensagem
              : 'Não foi possível carregar os usuários.',
          )
        }

        throw error
      }
    },

    logout() {
      this.token = ''
      this.user = null
      this.users = []

      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    },
  },
})
