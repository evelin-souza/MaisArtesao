import { defineStore } from 'pinia'

export type UserType = 'ADMIN' | 'ARTESAO' | 'CLIENTE'
export interface User {
  id: string
  email: string
  nome: string
  tipo: UserType
  senha: string
}

const USERS_KEY = 'maisartesao_users'
const TOKEN_KEY = 'token'
const USER_KEY = 'user'

const initialUsers: User[] = [
  { id: 'demo-admin', nome: 'Administrador MaisArtesão', email: 'admin@maisartesao.com', senha: 'Admin@123', tipo: 'ADMIN' },
  { id: 'demo-artesao', nome: 'Maria Artesã', email: 'artesao@maisartesao.com', senha: 'Artesao@123', tipo: 'ARTESAO' },
  { id: 'demo-cliente', nome: 'João Cliente', email: 'cliente@maisartesao.com', senha: 'Cliente@123', tipo: 'CLIENTE' },
]

function readUsers(): User[] {
  try {
    const saved = localStorage.getItem(USERS_KEY)
    if (saved) {
      const parsed = JSON.parse(saved) as User[]
      // Garante que os três perfis de demonstração sempre existam.
      const merged = [...parsed]
      for (const demo of initialUsers) {
        if (!merged.some(user => user.email.toLowerCase() === demo.email)) merged.push(demo)
      }
      localStorage.setItem(USERS_KEY, JSON.stringify(merged))
      return merged
    }
  } catch (error) {
    console.warn('Não foi possível ler os usuários salvos. Será usada a base inicial.', error)
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers))
  return [...initialUsers]
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: readUsers(),
    user: JSON.parse(localStorage.getItem(USER_KEY) || 'null') as Omit<User, 'senha'> | null,
    token: localStorage.getItem(TOKEN_KEY) || '',
  }),
  actions: {
    login(email: string, senha: string) {
      this.users = readUsers()
      const found = this.users.find(user => user.email.toLowerCase() === email.trim().toLowerCase() && user.senha === senha)
      if (!found) throw new Error('E-mail ou senha inválidos.')
      const { senha: _senha, ...safeUser } = found
      this.user = safeUser
      this.token = `local-${found.id}`
      localStorage.setItem(TOKEN_KEY, this.token)
      localStorage.setItem(USER_KEY, JSON.stringify(safeUser))
    },
    register(data: { nome: string; email: string; senha: string; tipo: UserType }) {
      this.users = readUsers()
      const email = data.email.trim().toLowerCase()
      if (this.users.some(user => user.email.toLowerCase() === email)) {
        throw new Error('Já existe uma conta cadastrada com esse e-mail.')
      }
      const newUser: User = {
        id: `user-${Date.now()}`,
        nome: data.nome.trim(),
        email,
        senha: data.senha,
        tipo: data.tipo,
      }
      this.users.push(newUser)
      saveUsers(this.users)
    },
    refreshUsers() {
      this.users = readUsers()
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    },
  },
})
