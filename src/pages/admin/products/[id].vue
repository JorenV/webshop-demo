<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useToast } from 'vue-toast-notification'
import { useField, useForm } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import * as zod from 'zod'
import { deleteProduct, getProduct, updateProduct } from '~/api/products'
import type { ProductInputDTO } from '~/api/products'

const props = defineProps<{ id: string }>()
const productId = parseInt(props.id, 10)
const { t } = useI18n()
const toast = useToast()
const router = useRouter()
const validationSchema = toFormValidator(
  zod.object({
    title: zod.string().min(1),
    sku: zod.string().min(1),
    price: zod.number(),
    // password: zod.string().nonempty('This is required').min(8, { message: 'Too short' }),
  }),
)

const {
  isLoading,
  isError,
  error,
  data,
} = useQuery(['product', productId],
  () => getProduct(productId))

const { handleSubmit, errors } = useForm<ProductInputDTO>({
  validationSchema,
  initialValues: data,
})

const { value: title } = useField('title')
const { value: sku } = useField('sku')
const { value: price } = useField('price')
const { value: basePrice } = useField('basePrice')

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

const onSubmit = handleSubmit((values) => {
  mutation.mutate({ id: productId, product: values })
})
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
        <form flex flex-col w-100 max-w-screen-md @submit="onSubmit">
          <div flex flex-col text-left mb-4>
            <label for="product-title">{{ t('product.title') }}</label>
            <input
              id="product-title"
              v-model="title"
              w-full
              :placeholder="t('product.title')"
              :aria-label="t('product.title')"
              type="text"
              autocomplete="false"
              p="x4 y2"
              text="center"
              bg="transparent"
              border="~ rounded gray-200 dark:gray-700"
              outline="none active:none"
            >
            <span text-red-900 text-sm mt-1>{{ errors.title }}</span>
          </div>
          <input
            v-model="sku"
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
          <span>{{ errors.sku }}</span>
          <input
            v-model="price"
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
          <span>{{ errors.price }}</span>

          <input
            v-model="basePrice"
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
          <span>{{ errors.basePrice }}</span>

          <button
            btn
          >
            {{ t('product.form.update') }}
          </button>
        </form>
        <button
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
