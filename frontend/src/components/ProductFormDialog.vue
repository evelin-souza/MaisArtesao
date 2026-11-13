
<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="600px"
  >
    <v-card rounded="lg" class="pa-2">
      <v-card-title class="text-h6 font-weight-bold">
        {{ isEdit ? 'Editar Peça' : 'Cadastrar Nova Peça' }}
      </v-card-title>

      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="formData.nome"
            label="Nome da Peça"
            variant="outlined"
            :rules="[v => !!v || 'Informe o nome da peça']"
            required
          />

          <v-textarea
            v-model="formData.descricao"
            label="Descrição detalhada"
            variant="outlined"
            rows="3"
            :rules="[
              v => !!v || 'Informe a descrição',
              v => (v?.length >= 5) || 'A descrição deve ter pelo menos 5 caracteres'
            ]"
            required
          />

          <v-select
            v-model="formData.id_categoria"
            :items="categorias"
            item-title="nome"
            item-value="id_categoria"
            label="Categoria"
            variant="outlined"
            :loading="carregandoCategorias"
            :rules="[v => !!v || 'Selecione uma categoria']"
            required
          />

          <v-text-field
            v-model.number="formData.preco"
            label="Preço (R$)"
            type="number"
            prefix="R$"
            min="0.01"
            step="0.01"
            variant="outlined"
            :rules="[
              v => v > 0 || 'O preço deve ser maior que zero'
            ]"
            required
          />

          <v-text-field
            v-model.number="formData.quantidade_estoque"
            label="Quantidade em estoque"
            type="number"
            min="0"
            step="1"
            variant="outlined"
            :rules="[
              v => Number.isInteger(v) || 'Informe uma quantidade inteira',
              v => v >= 0 || 'A quantidade não pode ser negativa'
            ]"
            required
          />

          <v-text-field
            v-model="formData.foto"
            label="URL da Foto do Produto"
            variant="outlined"
            placeholder="https://..."
            prepend-inner-icon="mdi-image"
          />

          <div class="d-flex justify-end gap-2 mt-4">
            <v-btn
              variant="text"
              @click="$emit('update:modelValue', false)"
            >
              Cancelar
            </v-btn>

            <v-btn
              type="submit"
              color="success"
              :loading="loading"
            >
              {{ isEdit ? 'Salvar Alterações' : 'Cadastrar' }}
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted } from 'vue'
import { api } from '@/services/api'

export interface ProductFormData {
  id?: number
  nome: string
  descricao: string
  preco: number
  foto: string
  id_categoria: number | null
  quantidade_estoque: number
}

interface Categoria {
  id_categoria: number
  nome: string
}

interface Props {
  modelValue: boolean
  initialData?: ProductFormData | null
  loading?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits([
  'update:modelValue',
  'save',
])

const formRef = ref()
const isEdit = ref(false)

const categorias = ref<Categoria[]>([])
const carregandoCategorias = ref(false)

const formData = reactive<ProductFormData>({
  nome: '',
  descricao: '',
  preco: 0,
  foto: '',
  id_categoria: null,
  quantidade_estoque: 0,
})

const limparFormulario = () => {
  Object.assign(formData, {
    id: undefined,
    nome: '',
    descricao: '',
    preco: 0,
    foto: '',
    id_categoria: null,
    quantidade_estoque: 0,
  })
}

const carregarCategorias = async () => {
  carregandoCategorias.value = true

  try {
    const response = await api.get('/categorias')
    categorias.value = response.data
  } catch (error) {
    console.error('Erro ao carregar categorias:', error)
    alert('Não foi possível carregar as categorias.')
  } finally {
    carregandoCategorias.value = false
  }
}

watch(
  () => [props.modelValue, props.initialData] as const,
  ([aberto, newData]) => {
    if (!aberto) return

    if (newData) {
      isEdit.value = true

      Object.assign(formData, {
        ...newData,
        id_categoria: newData.id_categoria ?? null,
      })
    } else {
      isEdit.value = false
      limparFormulario()
    }
  },
  { immediate: true },
)

const handleSubmit = async () => {
  const resultado = await formRef.value?.validate()

  if (!resultado?.valid) return

  emit('save', { ...formData })
}

onMounted(() => {
  carregarCategorias()
})
</script>
