<template>
  <v-card rounded="lg" class="fill-height d-flex flex-column elevation-2">
    <v-img :src="foto" height="200" cover class="bg-grey-lighten-2">
      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <v-card-title class="text-h6 pb-0">{{ nome }}</v-card-title>
    
    <v-card-subtitle class="text-primary font-weight-bold text-subtitle-1 pt-1">
      R$ {{ preco.toFixed(2) }}
    </v-card-subtitle>

    <v-card-text class="flex-grow-1 text-body-2 text-grey-darken-1">
      {{ descricao }}
    </v-card-text>

    <v-card-actions v-if="showAction">
      <v-btn
        color="primary"
        variant="tonal"
        block
        prepend-icon="mdi-cart-plus"
        @click="$emit('action')"
      >
        {{ actionLabel }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  nome: string
  descricao: string
  preco: number
  foto: string
  showAction?: boolean
  actionLabel?: string
}

withDefaults(defineProps<Props>(), {
  showAction: true,
  actionLabel: 'Adicionar ao Pedido'
})

defineEmits(['action'])
</script>