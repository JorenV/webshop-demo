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
    basePrice: zod.number(),
    stocked: zod.boolean(),
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
const { value: image } = useField('image')
const { value: stocked } = useField('stocked')

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
        <form flex flex-col w-100 max-w-screen-md novalidate @submit="onSubmit">
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
          <div flex flex-col text-left mb-4>
            <label for="product-sku">{{ t('product.sku') }}</label>
            <input
              id="product-sku"
              v-model="sku"
              w-full
              :placeholder="t('product.sku')"
              :aria-label="t('product.sku')"
              type="text"
              autocomplete="false"
              p="x4 y2"
              text="center"
              bg="transparent"
              border="~ rounded gray-200 dark:gray-700"
              outline="none active:none"
            >
            <span text-red-900 text-sm mt-1>{{ errors.sku }}</span>
          </div>

          <div flex flex-col text-left mb-4>
            <label for="product-price">{{ t('product.price') }}</label>
            <input
              id="product-price"
              v-model="price"
              w-full
              :placeholder="t('product.price')"
              :aria-label="t('product.price')"
              type="number"
              autocomplete="false"
              p="x4 y2"
              text="center"
              bg="transparent"
              border="~ rounded gray-200 dark:gray-700"
              outline="none active:none"
            >
            <span text-red-900 text-sm mt-1>{{ errors.price }}</span>
          </div>

          <div flex flex-col text-left mb-4>
            <label for="product-basePrice">{{ t('product.basePrice') }}</label>
            <input
              id="product-basePrice"
              v-model="basePrice"
              w-full
              :placeholder="t('product.basePrice')"
              :aria-label="t('product.basePrice')"
              type="number"
              autocomplete="false"
              p="x4 y2"
              text="center"
              bg="transparent"
              border="~ rounded gray-200 dark:gray-700"
              outline="none active:none"
            >
            <span text-red-900 text-sm mt-1>{{ errors.basePrice }}</span>
          </div>

          <div class="mb-4">
            <div flex items-center>
              <input
                id="product-stocked" v-model="stocked" type="checkbox"
                w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600
              >
              <label for="product-stocked" ml-2>{{ t('product.stocked') }}</label>
            </div>
            <span text-red-900 text-sm mt-1>{{ errors.stocked }}</span>
          </div>

          <button
            btn
            mb-3
          >
            {{ t('product.form.update') }}
          </button>
          <button
            type="button"
            btn
            bg-red-600
            hover:bg-red-700
            @click="deleteMutation.mutate(productId)"
          >
            {{ t('product.delete') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
