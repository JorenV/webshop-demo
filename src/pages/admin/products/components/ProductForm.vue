<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import type * as zod from 'zod'
import { schema } from './schema'
import type { ProductDTO } from '~/api/products'

const props = defineProps<{
  data?: ProductDTO
}>()
const emits = defineEmits(['submit'])

const { t } = useI18n()
type FormValues = zod.infer<typeof schema>

const { handleSubmit, errors, values } = useForm<FormValues>({
  // validateOnMount: false,
  validationSchema: toFormValidator(schema),
  initialValues: props.data
    ? { ...props.data }
    : {
        title: '',
        sku: '',
        price: 0,
        basePrice: 0,
        stocked: false,
      },
})

const onSubmit = handleSubmit((values) => {
  emits('submit', { ...values })
})
</script>

<template>
  <form flex flex-col w-100 max-w-screen-md novalidate @submit.prevent="onSubmit">
    <InputField type="text" name="title" />
    <InputField type="text" name="sku" />
    <InputField type="number" name="price" />
    <InputField type="number" name="basePrice" />

    <div class="mb-4">
      <div flex items-center>
        <input
          id="product-stocked" v-model="values.stocked" type="checkbox"
          w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600
        >
        <label for="product-stocked" ml-2>{{ t('product.stocked') }}</label>
      </div>
      <span v-if="errors.stocked" role="status" text-red-900 text-sm mt-1>{{ errors.stocked }}</span>
    </div>

    <button
      btn
      mb-3
    >
      {{ props.data ? t('product.form.update') : t('product.form.create') }}
    </button>
  </form>
</template>
