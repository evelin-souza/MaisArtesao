<script setup lang="ts">
import { ref, computed } from 'vue'
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CheckCircle2 } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

interface ItemCarrinho {
  id: number
  nome: string
  artesao: string
  preco: number
  quantidade: number
  imagem: string
}

const router = useRouter()
const pedidoFinalizado = ref(false)
const formaPagamento = ref('pix')

const itens = ref<ItemCarrinho[]>([
  {
    id: 1,
    nome: 'Vaso de Cerâmica Rústico',
    artesao: 'Ateliê Terra Viva',
    preco: 85.0,
    quantidade: 1,
    imagem: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    nome: 'Bolsa de Crochê Fio de Malha',
    artesao: 'Mãos de Ouro',
    preco: 120.0,
    quantidade: 2,
    imagem: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=200&q=80'
  }
])

const frete = 18.5

const subtotal = computed(() => {
  return itens.value.reduce((acc, item) => acc + item.preco * item.quantidade, 0)
})

const total = computed(() => {
  return itens.value.length > 0 ? subtotal.value + frete : 0
})

function aumentarQuantidade(item: ItemCarrinho) {
  item.quantidade++
}

function diminuirQuantidade(item: ItemCarrinho) {
  if (item.quantidade > 1) {
    item.quantidade--
  }
}

function removerItem(id: number) {
  itens.value = itens.value.filter(item => item.id !== id)
}

function finalizarCompra() {
  pedidoFinalizado.value = true
  itens.value = []
}

function formatarMoeda(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
</script>

<template>
  <div class="min-h-screen bg-stone-50 p-4 md:p-8">
    <div class="max-w-5xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <ShoppingCart class="w-7 h-7 text-amber-700" />
          <h1 class="text-2xl font-bold text-stone-800">Meu Carrinho</h1>
        </div>
        <button
          @click="router.push('/vitrine')"
          class="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-amber-700 transition"
        >
          <ArrowLeft class="w-4 h-4" />
          Continuar comprando
        </button>
      </div>

      <div
        v-if="pedidoFinalizado"
        class="bg-white rounded-2xl shadow-sm border border-emerald-200 p-8 text-center"
      >
        <CheckCircle2 class="w-16 h-16 text-emerald-600 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-stone-800 mb-2">Pedido realizado com sucesso!</h2>
        <p class="text-stone-600 mb-6">
          Os artesãos já foram notificados e logo começarão a preparar suas peças.
        </p>
        <button
          @click="router.push('/vitrine')"
          class="bg-amber-700 hover:bg-amber-800 text-white font-medium px-6 py-3 rounded-xl transition"
        >
          Voltar para a Vitrine
        </button>
      </div>

      <div
        v-else-if="itens.length === 0"
        class="bg-white rounded-2xl shadow-sm border border-stone-200 p-12 text-center"
      >
        <p class="text-stone-500 text-lg mb-4">Seu carrinho está vazio no momento.</p>
        <button
          @click="router.push('/vitrine')"
          class="bg-amber-700 hover:bg-amber-800 text-white font-medium px-6 py-2.5 rounded-xl transition"
        >
          Explorar artesanatos
        </button>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-4">
          <div
            v-for="item in itens"
            :key="item.id"
            class="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 flex items-center gap-4"
          >
            <img
              :src="item.imagem"
              :alt="item.nome"
              class="w-20 h-20 object-cover rounded-xl bg-stone-100"
            />
            <div class="flex-1">
              <h3 class="font-semibold text-stone-800">{{ item.nome }}</h3>
              <p class="text-xs text-stone-500 mb-2">Por: {{ item.artesao }}</p>
              <p class="font-bold text-amber-700">{{ formatarMoeda(item.preco) }}</p>
            </div>

            <div class="flex items-center gap-2 bg-stone-100 rounded-lg p-1">
              <button
                @click="diminuirQuantidade(item)"
                class="p-1.5 hover:bg-white rounded-md text-stone-700 transition"
              >
                <Minus class="w-4 h-4" />
              </button>
              <span class="w-6 text-center font-medium text-sm">{{ item.quantidade }}</span>
              <button
                @click="aumentarQuantidade(item)"
                class="p-1.5 hover:bg-white rounded-md text-stone-700 transition"
              >
                <Plus class="w-4 h-4" />
              </button>
            </div>

            <button
              @click="removerItem(item.id)"
              class="p-2 text-stone-400 hover:text-red-600 transition"
              title="Remover item"
            >
              <Trash2 class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 h-fit">
          <h2 class="text-lg font-bold text-stone-800 mb-4">Resumo da Compra</h2>

          <div class="space-y-3 text-sm border-b border-stone-200 pb-4 mb-4">
            <div class="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span>{{ formatarMoeda(subtotal) }}</span>
            </div>
            <div class="flex justify-between text-stone-600">
              <span>Frete estimado</span>
              <span>{{ formatarMoeda(frete) }}</span>
            </div>
          </div>

          <div class="flex justify-between items-center text-lg font-bold text-stone-800 mb-6">
            <span>Total</span>
            <span class="text-amber-700">{{ formatarMoeda(total) }}</span>
          </div>

          <div class="mb-6">
            <label class="block text-xs font-semibold uppercase text-stone-500 mb-2">
              Forma de Pagamento
            </label>
            <select
              v-model="formaPagamento"
              class="w-full border border-stone-300 rounded-xl px-3 py-2.5 text-sm text-stone-700 focus:outline-none focus:border-amber-600"
            >
              <option value="pix">PIX (Aprovação imediata)</option>
              <option value="cartao">Cartão de Crédito</option>
              <option value="boleto">Boleto Bancário</option>
            </select>
          </div>

          <button
            @click="finalizarCompra"
            class="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3.5 rounded-xl shadow-sm transition"
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </div>
  </div>
</template>