<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useToast } from 'vue-toast-notification'
import { deleteProduct, getProduct, updateProduct } from '~/api/products'
import type { ProductInputDTO } from '~/api/products'

const props = defineProps<{ id: string }>()
const productId = parseInt(props.id, 10)
const { t } = useI18n()
const toast = useToast()
const router = useRouter()

const {
  isLoading,
  isError,
  error,
  data,
} = useQuery(['product', productId],
  () => getProduct(productId))

const mutation = useMutation(updateProduct, {
  onSuccess: () => {
    toast.success(t('product.updated'))
    // Invalidate and refetch
    // queryClient.invalidateQueries(['product'])
  },

})

const deleteMutation = useMutation(deleteProduct, {
  onSuccess: () => {
    toast.success(t('product.removed'))
    router.push('/admin/products')
  },
})

const submit = (product: ProductInputDTO) => {
  mutation.mutate({ id: productId, product })
}
</script>

<template>
  <div>
    <div mb-5>
      <p text-xl mb-2>
        Webshop Admin
      </p>
      <router-link to="/admin/products" btn>
        {{ t('back') }}
      </router-link>
    </div>
    <div>
      <span v-if="isLoading">Loading...</span>
      <span v-else-if="isError">{{ error }}</span>
      <div v-else-if="data" flex flex-col items-center>
        <ProductForm :data="data" @submit="submit" />
        <button
          type="button"
          btn
          bg-red-600
          hover:bg-red-700
          @click="deleteMutation.mutate(productId)"
        >
          {{ t('product.delete') }}
        </button>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
