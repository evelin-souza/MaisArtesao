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
        @save="salvarProduto"
      />
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import ProductFormDialog, { type ProductFormData } from '@/components/ProductFormDialog.vue'

const dialog = ref(false)
const produtoSelecionado = ref<ProductFormData | null>(null)

const headers = [
  { title: 'Foto', key: 'foto' },
  { title: 'Nome', key: 'nome' },
  { title: 'Descrição', key: 'descricao' },
  { title: 'Preço', key: 'preco' },
  { title: 'Ações', key: 'acoes', sortable: false }
]

const produtos = ref<ProductFormData[]>([
  { id: 1, nome: 'Vaso de Argila Currais Novos', descricao: 'Feito à mão no Seridó', preco: 45.0, foto: 'https://picsum.photos/200' }
])

const abrirModalCadastro = () => {
  produtoSelecionado.value = null
  dialog.value = true
}

const abrirModalEdicao = (item: ProductFormData) => {
  produtoSelecionado.value = { ...item }
  dialog.value = true
}

const salvarProduto = (dados: ProductFormData) => {
  if (dados.id) {
    // Editando
    const index = produtos.value.findIndex(p => p.id === dados.id)
    if (index !== -1) produtos.value[index] = dados
  } else {
    // Cadastrando novo
    produtos.value.push({ ...dados, id: Date.now() })
  }
  dialog.value = false
}
</script>