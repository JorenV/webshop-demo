<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { useToast } from 'vue-toast-notification'
import type { ProductInput } from '~/types'

const { t } = useI18n()
const toast = useToast()
const router = useRouter()

const product = reactive<ProductInput>({
  title: '',
  price: 0,
  stocked: false,
  desc: '',
  image: 'https://dummyimage.com/300x300.jpg',
  basePrice: 0,
  sku: '',
})

const mutation = useMutation(createProduct, {
  onError: (error: string) => {
    toast.error(error)
  },
  onSuccess: () => {
    toast.success(t('product.created'))
    router.push('/admin/products')
    // Invalidate and refetch
    // queryClient.invalidateQueries(['products'])
  },

})

const submit = () => {
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
    <div>
      <h3>{{ $t('product.create') }}</h3>
      <input
        v-model="product.title"
        :placeholder="t('product.title')"
        :aria-label="t('product.title')"
        type="text"
        autocomplete="false"
        p="x4 y2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      >
      <input
        v-model="product.sku"
        :placeholder="t('product.sku')"
        :aria-label="t('product.sku')"
        type="text"
        autocomplete="false"
        p="x4 y2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      >
      <input
        v-model="product.price"
        :placeholder="t('product.price')"
        :aria-label="t('product.price')"
        type="number"
        autocomplete="false"
        p="x4 y2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      >
      <button
        btn
        :disabled="!product.title"
        @click="submit"
      >
        {{ t('product.create') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
