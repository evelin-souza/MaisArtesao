<template>
  <v-container class="auth-page fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="9" md="6" lg="5">
        <v-card rounded="xl" elevation="8" class="pa-5 pa-md-8">
          <div class="text-center mb-6">
            <v-avatar color="primary" size="58" class="mb-3">
              <v-icon icon="mdi-storefront-outline" size="30" />
            </v-avatar>

            <h1 class="text-h4 font-weight-bold">
              Crie sua conta
            </h1>

            <p class="text-medium-emphasis mt-2">
              Faça parte da Feira MaisArtesão de Currais Novos
            </p>
          </div>

          <v-alert
            v-if="erro"
            type="error"
            variant="tonal"
            class="mb-4"
            closable
            @click:close="erro = ''"
          >
            {{ erro }}
          </v-alert>

          <v-form @submit.prevent="cadastrar">
            <v-text-field
              v-model="nome"
              label="Nome completo"
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
              autocomplete="name"
              required
            />

            <v-text-field
              v-model="email"
              label="E-mail"
              prepend-inner-icon="mdi-email-outline"
              type="email"
              variant="outlined"
              autocomplete="email"
              required
            />

            <v-text-field
              v-model="telefone"
              label="Telefone"
              prepend-inner-icon="mdi-phone-outline"
              variant="outlined"
              required
            />

            <v-text-field
              v-model="cpf"
              label="CPF"
              prepend-inner-icon="mdi-card-account-details-outline"
              variant="outlined"
              required
            />

            <v-text-field
              v-model="endereco"
              label="Endereço"
              prepend-inner-icon="mdi-map-marker-outline"
              variant="outlined"
              required
            />

            <v-select
              v-model="tipo"
              label="Tipo de conta"
              prepend-inner-icon="mdi-account-switch-outline"
              :items="tipos"
              item-title="title"
              item-value="value"
              variant="outlined"
              required
            />

            <!-- Campo exclusivo para artesãos -->
            <v-text-field
              v-if="tipo === 'ARTESAO'"
              v-model="especialidade"
              label="Especialidade artesanal"
              prepend-inner-icon="mdi-palette-outline"
              variant="outlined"
              maxlength="100"
              counter="100"
              required
            />

            <v-text-field
              v-model="senha"
              label="Senha (mínimo 6 caracteres)"
              prepend-inner-icon="mdi-lock-outline"
              :type="mostrarSenha ? 'text' : 'password'"
              :append-inner-icon="
                mostrarSenha ? 'mdi-eye-off' : 'mdi-eye'
              "
              @click:append-inner="
                mostrarSenha = !mostrarSenha
              "
              variant="outlined"
              autocomplete="new-password"
              required
            />

            <v-text-field
              v-model="confirmarSenha"
              label="Confirme a senha"
              prepend-inner-icon="mdi-lock-check-outline"
              :type="mostrarSenha ? 'text' : 'password'"
              variant="outlined"
              autocomplete="new-password"
              required
            />

            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              class="mt-2"
              prepend-icon="mdi-account-plus-outline"
              :loading="carregando"
              :disabled="carregando"
            >
              Cadastrar
            </v-btn>
          </v-form>

          <div class="text-center mt-5 text-body-2">
            Já tem uma conta?

            <RouterLink
              to="/login"
              class="font-weight-bold text-primary"
            >
              Entrar
            </RouterLink>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { api } from '@/services/api'
import type { UserType } from '@/stores/auth.store'

const router = useRouter()

const nome = ref('')
const email = ref('')
const telefone = ref('')
const cpf = ref('')
const endereco = ref('')
const senha = ref('')
const confirmarSenha = ref('')
const especialidade = ref('')

const tipo = ref<UserType>('CLIENTE')
const mostrarSenha = ref(false)
const carregando = ref(false)
const erro = ref('')

const tipos = [
  {
    title: 'Cliente — comprar artesanato',
    value: 'CLIENTE',
  },
  {
    title: 'Artesão — cadastrar peças',
    value: 'ARTESAO',
  },
]

async function cadastrar() {
  erro.value = ''

  if (
    !nome.value.trim() ||
    !email.value.trim() ||
    !telefone.value.trim() ||
    !cpf.value.trim() ||
    !endereco.value.trim()
  ) {
    erro.value = 'Preencha todos os campos.'
    return
  }

  if (senha.value.length < 6) {
    erro.value = 'A senha precisa ter pelo menos 6 caracteres.'
    return
  }

  if (senha.value !== confirmarSenha.value) {
    erro.value = 'As senhas não são iguais.'
    return
  }

  if (
    tipo.value === 'ARTESAO' &&
    !especialidade.value.trim()
  ) {
    erro.value = 'Informe sua especialidade artesanal.'
    return
  }

  carregando.value = true

  try {
    const dadosBasicos = {
      nome: nome.value.trim(),
      email: email.value.trim(),
      senha: senha.value,
      telefone: telefone.value.trim(),
      cpf: cpf.value.trim(),
      endereco: endereco.value.trim(),
    }

    if (tipo.value === 'ARTESAO') {
      await api.post('/artesaos', {
        ...dadosBasicos,
        especialidade: especialidade.value.trim(),
      })
    } else {
      await api.post('/usuarios', {
        ...dadosBasicos,
        tipo_usuario: 'CLIENTE',
      })
    }

    alert(
      'Cadastro realizado com sucesso! Agora entre com seu e-mail e senha.',
    )

    router.push('/login')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const mensagem = error.response?.data?.message

      erro.value = Array.isArray(mensagem)
        ? mensagem.join(', ')
        : typeof mensagem === 'string'
          ? mensagem
          : 'Não foi possível concluir o cadastro.'
    } else {
      erro.value = 'Não foi possível concluir o cadastro.'
    }
  } finally {
    carregando.value = false
  }
}
</script>
