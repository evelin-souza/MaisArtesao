<template>
  <v-app-bar color="primary" elevation="2">
    <v-app-bar-title class="font-weight-bold">
      MaisArtesão — Feira de Currais Novos
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- Infos do Usuário Logado -->
    <div v-if="authStore.user" class="d-flex align-center gap-2 mr-4">
      <v-chip color="secondary" size="small" variant="flat">
        {{ authStore.user.tipo }}
      </v-chip>
      <span class="text-subtitle-2">{{ authStore.user.nome || authStore.user.email }}</span>
    </div>

    <!-- Botão de Sair -->
    <v-btn icon="mdi-logout" @click="handleLogout" title="Sair"></v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>