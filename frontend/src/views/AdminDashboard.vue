<template>
  <div>
    <Navbar />
    <v-container class="mt-6">
      <h1 class="text-h4 mb-6 font-weight-bold">Painel Administrativo — Gestão de Usuários</h1>

      <v-data-table :headers="headers" :items="usuarios" class="elevation-1">
        <template #item.tipo="{ item }">
          <v-chip :color="getChipColor(item.tipo)" size="small" variant="flat">
            {{ item.tipo }}
          </v-chip>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/services/api'
import Navbar from '@/components/Navbar.vue'

const headers = [
  { title: 'Nome', key: 'nome' },
  { title: 'E-mail', key: 'email' },
  { title: 'Tipo de Perfil', key: 'tipo' }
]

const usuarios = ref([])

onMounted(async () => {
  try {
    const response = await api.get('/usuarios')
    usuarios.value = response.data
  } catch (error) {
    console.error('Erro ao carregar usuários:', error)
  }
})

const getChipColor = (tipo: string) => {
  if (tipo === 'ADMIN') return 'error'
  if (tipo === 'ARTESAO') return 'warning'
  return 'info'
}
</script>