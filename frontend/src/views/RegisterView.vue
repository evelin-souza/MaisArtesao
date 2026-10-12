<template>
  <v-container class="auth-page fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="9" md="6" lg="5">
        <v-card rounded="xl" elevation="8" class="pa-5 pa-md-8">
          <div class="text-center mb-6">
            <v-avatar color="primary" size="58" class="mb-3"><v-icon icon="mdi-storefront-outline" size="30" /></v-avatar>
            <h1 class="text-h4 font-weight-bold">Crie sua conta</h1>
            <p class="text-medium-emphasis mt-2">Faça parte da Feira MaisArtesão de Currais Novos</p>
          </div>
          <v-alert v-if="erro" type="error" variant="tonal" class="mb-4" closable @click:close="erro = ''">{{ erro }}</v-alert>
          <v-form @submit.prevent="cadastrar">
            <v-text-field v-model="nome" label="Nome completo" prepend-inner-icon="mdi-account-outline" variant="outlined" autocomplete="name" :rules="[v => !!v?.trim() || 'Informe seu nome']" required />
            <v-text-field v-model="email" label="E-mail" prepend-inner-icon="mdi-email-outline" type="email" variant="outlined" autocomplete="email" required />
            <v-select v-model="tipo" label="Tipo de conta" prepend-inner-icon="mdi-account-switch-outline" :items="tipos" item-title="title" item-value="value" variant="outlined" required />
            <v-text-field v-model="senha" label="Senha (mínimo 6 caracteres)" prepend-inner-icon="mdi-lock-outline" :type="mostrarSenha ? 'text' : 'password'" :append-inner-icon="mostrarSenha ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="mostrarSenha = !mostrarSenha" variant="outlined" autocomplete="new-password" :rules="[v => (v?.length ?? 0) >= 6 || 'Use pelo menos 6 caracteres']" required />
            <v-text-field v-model="confirmarSenha" label="Confirme a senha" prepend-inner-icon="mdi-lock-check-outline" :type="mostrarSenha ? 'text' : 'password'" variant="outlined" autocomplete="new-password" required />
            <v-btn type="submit" color="primary" size="large" block class="mt-2" prepend-icon="mdi-account-plus-outline">Cadastrar</v-btn>
          </v-form>
          <div class="text-center mt-5 text-body-2">Já tem uma conta? <RouterLink to="/login" class="font-weight-bold text-primary">Entrar</RouterLink></div>
          <v-alert class="mt-5" type="info" variant="tonal" density="compact">Cadastro demonstrativo: os dados ficam salvos neste navegador.</v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, type UserType } from '@/stores/auth.store'

const nome = ref('')
const email = ref('')
const senha = ref('')
const confirmarSenha = ref('')
const tipo = ref<UserType>('CLIENTE')
const mostrarSenha = ref(false)
const erro = ref('')
const router = useRouter()
const auth = useAuthStore()
const tipos = [
  { title: 'Cliente — comprar artesanato', value: 'CLIENTE' },
  { title: 'Artesão — cadastrar peças', value: 'ARTESAO' },
]

function cadastrar() {
  erro.value = ''
  if (!nome.value.trim() || !email.value.trim()) { erro.value = 'Preencha nome e e-mail.'; return }
  if (senha.value.length < 6) { erro.value = 'A senha precisa ter pelo menos 6 caracteres.'; return }
  if (senha.value !== confirmarSenha.value) { erro.value = 'As senhas não são iguais.'; return }
  try {
    auth.register({ nome: nome.value, email: email.value, senha: senha.value, tipo: tipo.value })
    alert('Cadastro realizado! Agora entre com seu e-mail e senha.')
    router.push('/login')
  } catch (e) {
    erro.value = e instanceof Error ? e.message : 'Não foi possível concluir o cadastro.'
  }
}
</script>
