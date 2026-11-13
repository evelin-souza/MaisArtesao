
<template>
  <div>
    <Navbar />

    <v-container class="mt-6">
      <h1 class="text-h4 mb-6 font-weight-bold">
        Vitrine de Artesanato — Currais Novos
      </h1>

      <v-progress-linear
        v-if="carregando"
        indeterminate
        color="primary"
      />

      <v-alert
        v-else-if="erro"
        type="error"
        class="mb-4"
      >
        {{ erro }}
      </v-alert>

      <v-alert
        v-else-if="produtos.length === 0"
        type="info"
        class="mb-4"
      >
        Ainda não há peças disponíveis na vitrine.
      </v-alert>

      <v-row v-else>
        <v-col
          v-for="produto in produtos"
          :key="produto.id"
          cols="12"
          sm="6"
          md="4"
        >
          <ProductCard
            :nome="produto.nome"
            :descricao="produto.descricao"
            :preco="produto.preco"
            :foto="produto.foto"
            actionLabel="Adicionar ao Pedido"
            @action="adicionarAoCarrinho(produto)"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import ProductCard from '@/components/ProductCard.vue'
import { api } from '@/services/api'

interface Produto {
  id: number
  nome: string
  descricao: string
  preco: number
  foto: string
}

const produtos = ref<Produto[]>([])
const carregando = ref(false)
const erro = ref('')

// Busca os produtos cadastrados no backend
const carregarProdutos = async () => {
  carregando.value = true
  erro.value = ''

  try {
    const response = await api.get('/produtos')

    produtos.value = response.data.map((produto: any) => ({
      id: produto.id_produto,
      nome: produto.nome,
      descricao: produto.descricao,
      preco: Number(produto.preco),
      foto: produto.imagem_url || '',
    }))

    console.log('Produtos carregados na vitrine:', produtos.value)
  } catch (error) {
    console.error('Erro ao carregar produtos da vitrine:', error)
    erro.value = 'Não foi possível carregar os produtos. Tente novamente.'
  } finally {
    carregando.value = false
  }
}

const adicionarAoCarrinho = (produto: Produto) => {
  alert(`Produto "${produto.nome}" adicionado ao seu pedido!`)
}

onMounted(() => {
  carregarProdutos()
})
</script>
