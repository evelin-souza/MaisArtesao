<script setup lang="ts">
import { ref, computed } from 'vue'
import { Store, Plus, Trash2, DollarSign, Receipt, Check, ArrowLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

interface ProdutoCatalogo {
  id: number
  nome: string
  preco: number
  estoque: number
}

interface ItemVenda {
  produto: ProdutoCatalogo
  quantidade: number
}

interface VendaRegistrada {
  id: number
  hora: string
  cliente: string
  pagamento: string
  total: number
  qtdItens: number
}

const router = useRouter()

const catalogo = ref<ProdutoCatalogo[]>([
  { id: 1, nome: 'Vaso de Cerâmica Rústico', preco: 85.0, estoque: 6 },
  { id: 2, nome: 'Bolsa de Crochê Fio de Malha', preco: 120.0, estoque: 4 },
  { id: 3, nome: 'Porta-chaves Macramê', preco: 35.0, estoque: 12 },
  { id: 4, nome: 'Tábua de Corte Madeira Nobre', preco: 150.0, estoque: 3 }
])

const carrinhoVenda = ref<ItemVenda[]>([])
const nomeCliente = ref('')
const formaPagamento = ref('PIX')
const desconto = ref<number>(0)
const valorRecebido = ref<number>(0)
const historicoVendas = ref<VendaRegistrada[]>([])
const alertaSucesso = ref(false)

function adicionarAoCaixa(produto: ProdutoCatalogo) {
  const existente = carrinhoVenda.value.find(item => item.produto.id === produto.id)
  if (existente) {
    if (existente.quantidade < produto.estoque) {
      existente.quantidade++
    }
  } else if (produto.estoque > 0) {
    carrinhoVenda.value.push({ produto, quantidade: 1 })
  }
}

function removerDoCaixa(produtoId: number) {
  carrinhoVenda.value = carrinhoVenda.value.filter(item => item.produto.id !== produtoId)
}

const subtotalVenda = computed(() => {
  return carrinhoVenda.value.reduce(
    (acc, item) => acc + item.produto.preco * item.quantidade,
    0
  )
})

const totalVenda = computed(() => {
  const valor = subtotalVenda.value - (desconto.value || 0)
  return valor > 0 ? valor : 0
})

const troco = computed(() => {
  if (formaPagamento.value !== 'Dinheiro' || valorRecebido.value <= totalVenda.value) {
    return 0
  }
  return valorRecebido.value - totalVenda.value
})

const totalFaturadoHoje = computed(() => {
  return historicoVendas.value.reduce((acc, v) => acc + v.total, 0)
})

function registrarVenda() {
  if (carrinhoVenda.value.length === 0) return

  carrinhoVenda.value.forEach(item => {
    const prod = catalogo.value.find(p => p.id === item.produto.id)
    if (prod) prod.estoque -= item.quantidade
  })

  const agora = new Date()
  const horaFormatada = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  historicoVendas.value.unshift({
    id: Date.now(),
    hora: horaFormatada,
    cliente: nomeCliente.value.trim() || 'Cliente Balcão',
    pagamento: formaPagamento.value,
    total: totalVenda.value,
    qtdItens: carrinhoVenda.value.reduce((acc, i) => acc + i.quantidade, 0)
  })

  carrinhoVenda.value = []
  nomeCliente.value = ''
  desconto.value = 0
  valorRecebido.value = 0

  alertaSucesso.value = true
  setTimeout(() => {
    alertaSucesso.value = false
  }, 3000)
}

function formatarMoeda(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
</script>

<template>
  <div class="min-h-screen bg-stone-100 p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-amber-700 text-white rounded-xl">
            <Store class="w-6 h-6" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-stone-800">Frente de Caixa (PDV)</h1>
            <p class="text-sm text-stone-500">Registre vendas presenciais e encomendas rápidas</p>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <button
            @click="router.push('/artesao')"
            class="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-amber-700 transition"
          >
            <ArrowLeft class="w-4 h-4" />
            Voltar ao Painel
          </button>

          <div class="bg-white px-5 py-3 rounded-xl border border-stone-200 flex items-center gap-3 shadow-sm">
            <DollarSign class="w-5 h-5 text-emerald-600" />
            <div>
              <p class="text-xs text-stone-500">Vendas de hoje ({{ historicoVendas.length }})</p>
              <p class="text-lg font-bold text-emerald-700">{{ formatarMoeda(totalFaturadoHoje) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="alertaSucesso"
        class="mb-6 bg-emerald-600 text-white px-4 py-3 rounded-xl flex items-center gap-2 shadow-sm"
      >
        <Check class="w-5 h-5" />
        <span class="font-medium">Venda registrada com sucesso e estoque atualizado!</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-7 space-y-6">
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
            <h2 class="text-base font-bold text-stone-800 mb-4">1. Selecione as Peças</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                v-for="produto in catalogo"
                :key="produto.id"
                @click="adicionarAoCaixa(produto)"
                :disabled="produto.estoque === 0"
                class="text-left p-4 rounded-xl border border-stone-200 hover:border-amber-600 hover:bg-amber-50/40 transition flex justify-between items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div>
                  <p class="font-semibold text-stone-800 text-sm">{{ produto.nome }}</p>
                  <p class="text-xs text-stone-500 mt-0.5">Estoque: {{ produto.estoque }} un.</p>
                  <p class="text-sm font-bold text-amber-700 mt-1">
                    {{ formatarMoeda(produto.preco) }}
                  </p>
                </div>
                <div class="p-2 bg-amber-100 text-amber-800 rounded-lg">
                  <Plus class="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>

          <div class="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
            <div class="flex items-center gap-2 mb-4">
              <Receipt class="w-5 h-5 text-stone-600" />
              <h2 class="text-base font-bold text-stone-800">Últimas Vendas Registradas</h2>
            </div>

            <div v-if="historicoVendas.length === 0" class="text-sm text-stone-400 py-4 text-center">
              Nenhuma venda registrada nesta sessão.
            </div>

            <div v-else class="divide-y divide-stone-100">
              <div
                v-for="venda in historicoVendas"
                :key="venda.id"
                class="py-3 flex items-center justify-between text-sm"
              >
                <div>
                  <p class="font-medium text-stone-800">
                    {{ venda.cliente }}
                    <span class="text-xs text-stone-400 ml-1">({{ venda.hora }})</span>
                  </p>
                  <p class="text-xs text-stone-500">
                    {{ venda.qtdItens }} item(ns) • {{ venda.pagamento }}
                  </p>
                </div>
                <span class="font-bold text-emerald-700">{{ formatarMoeda(venda.total) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 sticky top-6">
            <h2 class="text-base font-bold text-stone-800 mb-4">2. Resumo da Venda Atual</h2>

            <div class="min-h-[140px] max-h-60 overflow-y-auto border-b border-stone-200 pb-4 mb-4 space-y-2">
              <p v-if="carrinhoVenda.length === 0" class="text-sm text-stone-400 text-center py-8">
                Clique nos produtos ao lado para adicionar ao caixa.
              </p>

              <div
                v-for="item in carrinhoVenda"
                :key="item.produto.id"
                class="flex items-center justify-between text-sm bg-stone-50 p-2.5 rounded-lg"
              >
                <div>
                  <p class="font-medium text-stone-800">{{ item.produto.nome }}</p>
                  <p class="text-xs text-stone-500">
                    {{ item.quantidade }}x {{ formatarMoeda(item.produto.preco) }}
                  </p>
                </div>
                <div class="flex items-center gap-3">
                  <span class="font-semibold text-stone-700">
                    {{ formatarMoeda(item.produto.preco * item.quantidade) }}
                  </span>
                  <button
                    @click="removerDoCaixa(item.produto.id)"
                    class="text-stone-400 hover:text-red-600"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div class="space-y-3 mb-5">
              <div>
                <label class="block text-xs font-medium text-stone-600 mb-1">
                  Nome do Cliente (Opcional)
                </label>
                <input
                  v-model="nomeCliente"
                  type="text"
                  placeholder="Ex: Maria Silva"
                  class="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-600"
                />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-stone-600 mb-1">Pagamento</label>
                  <select
                    v-model="formaPagamento"
                    class="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-600"
                  >
                    <option value="PIX">PIX</option>
                    <option value="Cartão Débito">Cartão Débito</option>
                    <option value="Cartão Crédito">Cartão Crédito</option>
                    <option value="Dinheiro">Dinheiro</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-medium text-stone-600 mb-1">Desconto (R$)</label>
                  <input
                    v-model.number="desconto"
                    type="number"
                    min="0"
                    class="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div v-if="formaPagamento === 'Dinheiro'" class="bg-amber-50 p-3 rounded-xl space-y-2">
                <div class="flex items-center justify-between gap-2">
                  <label class="text-xs font-medium text-stone-700">Valor Recebido (R$):</label>
                  <input
                    v-model.number="valorRecebido"
                    type="number"
                    min="0"
                    class="w-28 border border-stone-300 bg-white rounded-lg px-2 py-1 text-sm text-right"
                  />
                </div>
                <div class="flex justify-between text-sm font-bold text-amber-900">
                  <span>Troco:</span>
                  <span>{{ formatarMoeda(troco) }}</span>
                </div>
              </div>
            </div>

            <div class="border-t border-stone-200 pt-4 mb-5 space-y-1">
              <div class="flex justify-between text-sm text-stone-500">
                <span>Subtotal</span>
                <span>{{ formatarMoeda(subtotalVenda) }}</span>
              </div>
              <div class="flex justify-between text-xl font-bold text-stone-800">
                <span>Total a Pagar</span>
                <span class="text-amber-700">{{ formatarMoeda(totalVenda) }}</span>
              </div>
            </div>

            <button
              @click="registrarVenda"
              :disabled="carrinhoVenda.length === 0"
              class="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 text-white font-semibold py-3.5 rounded-xl transition shadow-sm"
            >
              Concluir Venda
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>