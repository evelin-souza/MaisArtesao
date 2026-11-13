<template>
  <div>
    <Navbar />

    <v-container class="page-container py-8">
      <div class="d-flex flex-wrap align-center justify-space-between ga-4 mb-6">
        <div>
          <p class="text-overline text-primary">PAINEL DE CONTROLE</p>
          <h1 class="text-h4 font-weight-bold">Gestão de usuários</h1>
          <p class="text-medium-emphasis mt-1">
            Contas cadastradas no sistema
          </p>
        </div>

        <v-btn
          color="primary"
          prepend-icon="mdi-refresh"
          variant="tonal"
          :loading="carregando"
          @click="carregarUsuarios"
        >
          Atualizar lista
        </v-btn>
      </div>

      <v-alert
        v-if="erro"
        type="error"
        variant="tonal"
        class="mb-4"
      >
        {{ erro }}
      </v-alert>

      <v-row class="mb-4">
        <v-col
          v-for="card in resumo"
          :key="card.tipo"
          cols="12"
          sm="4"
        >
          <v-card rounded="lg" variant="outlined" class="pa-4">
            <div class="text-medium-emphasis text-body-2">
              {{ card.label }}
            </div>

            <div class="text-h4 font-weight-bold mt-2">
              {{ auth.users.filter(u => u.tipo === card.tipo).length }}
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-card rounded="lg" variant="outlined">
        <v-data-table
          :headers="headers"
          :items="auth.users"
          item-value="id"
          :loading="carregando"
          loading-text="Carregando usuários..."
          no-data-text="Nenhum usuário cadastrado"
        >
          <template #item.tipo="{ item }">
            <v-chip
              :color="getChipColor(item.tipo)"
              size="small"
              variant="tonal"
            >
              {{ labels[item.tipo] }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import { useAuthStore, type UserType } from '@/stores/auth.store'

const auth = useAuthStore()

const carregando = ref(false)
const erro = ref('')

const headers = [
  { title: 'Nome', key: 'nome' },
  { title: 'E-mail', key: 'email' },
  { title: 'Tipo de perfil', key: 'tipo' },
]

const labels: Record<UserType, string> = {
  ADMIN: 'Administrador',
  ARTESAO: 'Artesão',
  CLIENTE: 'Cliente',
}

const resumo = [
  { tipo: 'ADMIN' as UserType, label: 'Administradores' },
  { tipo: 'ARTESAO' as UserType, label: 'Artesãos' },
  { tipo: 'CLIENTE' as UserType, label: 'Clientes' },
]

const getChipColor = (tipo: UserType) =>
  tipo === 'ADMIN'
    ? 'error'
    : tipo === 'ARTESAO'
      ? 'warning'
      : 'info'

async function carregarUsuarios() {
  carregando.value = true
  erro.value = ''

  try {
    await auth.fetchUsers()
  } catch (error) {
    erro.value = error instanceof Error
      ? error.message
      : 'Não foi possível carregar os usuários.'
  } finally {
    carregando.value = false
  }
}

onMounted(carregarUsuarios)
</script>
