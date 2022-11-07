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
  Error : {{ errors }}
  <form flex flex-col w-100 max-w-screen-md novalidate @submit.prevent="onSubmit">
    <div flex flex-col text-left mb-4>
      <label for="product-title">{{ t('product.title') }}</label>
      <input
        id="product-title"
        v-model="values.title"
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
      <span v-if="errors.title" role="status" text-red-900 text-sm mt-1>{{ errors.title }}</span>
    </div>
    <div flex flex-col text-left mb-4>
      <label for="product-sku">{{ t('product.sku') }}</label>
      <input
        id="product-sku"
        v-model="values.sku"
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
      <span v-if="errors.sku" role="status" text-red-900 text-sm mt-1>{{ errors.sku }}</span>
    </div>

    <div flex flex-col text-left mb-4>
      <label for="product-price">{{ t('product.price') }}</label>
      <input
        id="product-price"
        v-model="values.price"
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
      <span v-if="errors.price" role="status" text-red-900 text-sm mt-1>{{ errors.price }}</span>
    </div>

    <div flex flex-col text-left mb-4>
      <label for="product-basePrice">{{ t('product.basePrice') }}</label>
      <input
        id="product-basePrice"
        v-model="values.basePrice"
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
      <span v-if="errors.basePrice" role="status" text-red-900 text-sm mt-1>{{ errors.basePrice }}</span>
    </div>

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
