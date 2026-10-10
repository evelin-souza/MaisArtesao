<template>
  <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="600px">
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
            required
          />
          <v-textarea
            v-model="formData.descricao"
            label="Descrição detalhada"
            variant="outlined"
            rows="3"
            required
          />
          <v-text-field
            v-model.number="formData.preco"
            label="Preço (R$)"
            type="number"
            prefix="R$"
            variant="outlined"
            required
          />
          <v-text-field
            v-model="formData.foto"
            label="URL da Foto do Produto"
            variant="outlined"
            placeholder="https://..."
            prepend-inner-icon="mdi-image"
            required
          />

          <div class="d-flex justify-end gap-2 mt-4">
            <v-btn variant="text" @click="$emit('update:modelValue', false)">Cancelar</v-btn>
            <v-btn type="submit" color="success" :loading="loading">
              {{ isEdit ? 'Salvar Alterações' : 'Cadastrar' }}
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

export interface ProductFormData {
  id?: number
  nome: string
  descricao: string
  preco: number
  foto: string
}

interface Props {
  modelValue: boolean
  initialData?: ProductFormData | null
  loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'save'])

const isEdit = reactive({ value: false })

const formData = reactive<ProductFormData>({
  nome: '',
  descricao: '',
  preco: 0,
  foto: ''
})

watch(() => props.initialData, (newData) => {
  if (newData) {
    isEdit.value = true
    Object.assign(formData, newData)
  } else {
    isEdit.value = false
    Object.assign(formData, { nome: '', descricao: '', preco: 0, foto: '' })
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('save', { ...formData })
}
</script>