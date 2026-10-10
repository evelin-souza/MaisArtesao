<template>
  <div>
    <Navbar />
    <v-container class="mt-6">
      <h1 class="text-h4 mb-6 font-weight-bold">Vitrine de Artesanato — Currais Novos</h1>

      <v-row>
        <v-col v-for="produto in produtos" :key="produto.id" cols="12" sm="6" md="4">
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
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import ProductCard from '@/components/ProductCard.vue'

const produtos = ref([
  { id: 1, nome: 'Vaso de Argila Currais Novos', descricao: 'Feito à mão no Seridó', preco: 45.0, foto: 'https://picsum.photos/200' },
  { id: 2, nome: 'Bordado Tradicional', descricao: 'Bordado exclusivo feito por artesãs locais', preco: 80.0, foto: 'https://picsum.photos/201' }
])

const adicionarAoCarrinho = (produto: any) => {
  alert(`Produto "${produto.nome}" adicionado ao seu pedido!`)
}
</script>