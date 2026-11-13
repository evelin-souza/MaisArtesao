<template>
  <div>
    <Navbar />
    <v-container class="mt-6">
      <v-row class="mb-4" align="center">
        <v-col>
          <h1 class="text-h4 font-weight-bold">Meu Estoque de Peças</h1>
        </v-col>
        <v-col class="text-right">
          <v-btn color="primary" prepend-icon="mdi-plus" @click="abrirModalCadastro()">
            Nova Peça
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table :headers="headers" :items="produtos">
        <template #item.foto="{ item }">
          <v-img :src="item.foto" width="50" height="50" cover class="rounded my-2"></v-img>
        </template>
        <template #item.preco="{ item }">
          R$ {{ item.preco.toFixed(2) }}
        </template>
        <template #item.acoes="{ item }">
          <v-btn icon="mdi-pencil" size="small" variant="text" color="primary" @click="abrirModalEdicao(item)" />
        </template>
      </v-data-table>

      <!-- Componente reutilizável do Modal -->
      <ProductFormDialog
        v-model="dialog"
        :initial-data="produtoSelecionado"
        :loading="salvando"
        @save="salvarProduto"
      />
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import ProductFormDialog, { type ProductFormData } from '@/components/ProductFormDialog.vue'
import { api } from '@/services/api'
import { useAuthStore } from '@/stores/auth.store'

const auth = useAuthStore()
const salvando = ref(false)

const dialog = ref(false)
const produtoSelecionado = ref<ProductFormData | null>(null)

const headers = [
  { title: 'Foto', key: 'foto' },
  { title: 'Nome', key: 'nome' },
  { title: 'Descrição', key: 'descricao' },
  { title: 'Preço', key: 'preco' },
  { title: 'Ações', key: 'acoes', sortable: false }
]

const produtos = ref<ProductFormData[]>([])

const abrirModalCadastro = () => {
  produtoSelecionado.value = null
  dialog.value = true
}

const abrirModalEdicao = (item: ProductFormData) => {
  produtoSelecionado.value = { ...item }
  dialog.value = true
}

const carregarProdutos = async () => {
  try {
    const response = await api.get('/produtos/me')

    produtos.value = response.data.map((produto: any) => ({
      id: produto.id_produto,
      nome: produto.nome,
      descricao: produto.descricao,
      preco: Number(produto.preco),
      foto: produto.imagem_url || '',
      id_categoria: produto.categoria?.id_categoria ?? null,
      quantidade_estoque: produto.quantidade_estoque,
    }))
  } catch (error) {
    console.error('Erro ao carregar produtos:', error)
    alert('Não foi possível carregar seu estoque.')
  }
}

const salvarProduto = async (dados: ProductFormData) => {
  salvando.value = true

  try {
    const dadosProduto = {
      nome: dados.nome,
      descricao: dados.descricao,
      preco: dados.preco,
      quantidade_estoque: dados.quantidade_estoque,
      imagem_url: dados.foto || undefined,
      id_categoria: dados.id_categoria,
    }

    if (dados.id) {
      // Atualizar produto existente
      await api.patch(
        `/produtos/${dados.id}`,
        dadosProduto,
      )
    } else {
      // Cadastrar novo produto
      await api.post('/produtos', {
        ...dadosProduto,
        id_artesao: Number(auth.user?.id),
      })
    }

    await carregarProdutos()

    dialog.value = false

    alert(
      dados.id
        ? 'Peça atualizada com sucesso!'
        : 'Peça cadastrada com sucesso!',
    )
  } catch (error: any) {
    console.error('Erro ao salvar produto:', error)

    const mensagem = error.response?.data?.message

    alert(
      Array.isArray(mensagem)
        ? mensagem.join('\n')
        : mensagem || 'Não foi possível salvar a peça.',
    )
  } finally {
    salvando.value = false
  }
}

onMounted(() => {
  carregarProdutos()
  })
</script>