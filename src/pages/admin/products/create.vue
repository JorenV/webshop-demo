<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { useToast } from 'vue-toast-notification'
import ProductForm from './components/ProductForm.vue'
import type { ProductInputDTO } from '~/api/products'
import { createProduct } from '~/api/products'

const { t } = useI18n()
const toast = useToast()
const router = useRouter()

const mutation = useMutation(createProduct, {
  onSuccess: () => {
    toast.success(t('product.created'))
    router.push('/admin/products')
  },

})

const submit = (product: ProductInputDTO) => {
  mutation.mutate(product)
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
    <div flex flex-col items-center>
      <h3>{{ $t('product.create') }}</h3>
      <ProductForm @submit="submit" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
