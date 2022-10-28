<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useToast } from 'vue-toast-notification'
import { useField, useForm } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import * as zod from 'zod'
import { deleteProduct, getProduct, updateProduct } from '~/api/products'
import type { ProductDTO } from '~/api/products'

const props = defineProps<{ id: string }>()
const productId = parseInt(props.id, 10)
const { t } = useI18n()
const toast = useToast()
const router = useRouter()
const validationSchema = toFormValidator(
  zod.object({
    title: zod.string().nonempty('This is required'),
    // password: zod.string().nonempty('This is required').min(8, { message: 'Too short' }),
  }),
)
const { handleSubmit, errors } = useForm({
  validationSchema,
})

const { value: title } = useField('title')

const {
  isLoading,
  isError,
  error,
  data,
} = useQuery(['product', props.id],
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
      <div v-else-if="data">
        <form @submit="onSubmit">
          <input
            v-model="title"
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
          <span>{{ errors.title }}</span>

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
          @click="deleteMutation.mutate(parseInt(props.id))"
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
