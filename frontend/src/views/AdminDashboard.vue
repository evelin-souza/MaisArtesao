<template>
  <div>
    <Navbar />
    <v-container class="page-container py-8">
      <div class="d-flex flex-wrap align-center justify-space-between ga-4 mb-6">
        <div><p class="text-overline text-primary">PAINEL DE CONTROLE</p><h1 class="text-h4 font-weight-bold">Gestão de usuários</h1><p class="text-medium-emphasis mt-1">Contas cadastradas neste navegador</p></div>
        <v-btn color="primary" prepend-icon="mdi-refresh" variant="tonal" @click="auth.refreshUsers()">Atualizar lista</v-btn>
      </div>
      <v-row class="mb-4">
        <v-col v-for="card in resumo" :key="card.tipo" cols="12" sm="4"><v-card rounded="lg" variant="outlined" class="pa-4"><div class="text-medium-emphasis text-body-2">{{ card.label }}</div><div class="text-h4 font-weight-bold mt-2">{{ auth.users.filter(u => u.tipo === card.tipo).length }}</div></v-card></v-col>
      </v-row>
      <v-card rounded="lg" variant="outlined">
        <v-data-table :headers="headers" :items="auth.users" item-key="id" no-data-text="Nenhum usuário cadastrado">
          <template #item.tipo="{ item }"><v-chip :color="getChipColor(item.tipo)" size="small" variant="tonal">{{ labels[item.tipo] }}</v-chip></template>
        </v-data-table>
      </v-card>
      <v-alert type="warning" variant="tonal" class="mt-5">Esta é uma versão de demonstração: os usuários ficam no localStorage deste navegador e as senhas não são protegidas como seriam em um backend real.</v-alert>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { useAuthStore, type UserType } from '@/stores/auth.store'
const auth = useAuthStore()
const headers = [{ title: 'Nome', key: 'nome' }, { title: 'E-mail', key: 'email' }, { title: 'Tipo de perfil', key: 'tipo' }]
const labels: Record<UserType, string> = { ADMIN: 'Administrador', ARTESAO: 'Artesão', CLIENTE: 'Cliente' }
const resumo = [{ tipo: 'ADMIN' as UserType, label: 'Administradores' }, { tipo: 'ARTESAO' as UserType, label: 'Artesãos' }, { tipo: 'CLIENTE' as UserType, label: 'Clientes' }]
const getChipColor = (tipo: UserType) => tipo === 'ADMIN' ? 'error' : tipo === 'ARTESAO' ? 'warning' : 'info'
</script>
