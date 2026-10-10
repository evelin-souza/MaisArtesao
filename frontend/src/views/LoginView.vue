<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12 pa-4" rounded="lg">
          <v-card-title class="text-h5 text-center font-weight-bold text-primary">
            MaisArtesão
          </v-card-title>
          <v-card-subtitle class="text-center mb-4">
            Feira de Artesanato de Currais Novos
          </v-card-subtitle>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                label="E-mail"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                required
              />
              <v-text-field
                v-model="senha"
                label="Senha"
                type="password"
                prepend-inner-icon="mdi-lock"
                variant="outlined"
                required
              />
              <v-btn
                type="submit"
                color="primary"
                block
                size="large"
                class="mt-2"
                :loading="loading"
              >
                Entrar
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const email = ref('')
const senha = ref('')
const loading = ref(false)

const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  try {
    loading.value = true
    await authStore.login(email.value, senha.value)
    
    if (authStore.user?.tipo === 'ADMIN') router.push('/admin')
    else if (authStore.user?.tipo === 'ARTESAO') router.push('/artesao')
    else router.push('/vitrine')
  } catch (error) {
    alert('Falha na autenticação. Verifique seu e-mail e senha.')
  } finally {
    loading.value = false
  }
}
</script>