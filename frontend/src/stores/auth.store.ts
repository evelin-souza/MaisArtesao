import { defineStore } from 'pinia'
import { api } from '@/services/api'

export interface User {
  id: string
  email: string
  nome: string
  tipo: 'ADMIN' | 'ARTESAO' | 'CLIENTE'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    async login(email: string, senha: string) {
      const response = await api.post('/auth/login', { email, senha })
      this.token = response.data.access_token
      this.user = response.data.usuario

      localStorage.setItem('token', this.token)
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})