<script setup lang="ts">
import { useField } from 'vee-validate'
const props = defineProps<{
  type: string
  name: string
}>()

const { t } = useI18n()

const { value, errorMessage, errors } = useField(toRef(props, 'name'))
</script>

<template>
  <div flex flex-col text-left mb-4>
    <label :for="`product-${props.name}`">{{ t(`product.${props.name}`) }}</label>
    <input
      :id="`product-${props.name}`"
      v-model="value"
      :aria-errormessage="`error-${props.name}`"
      w-full
      :placeholder="t(`product.${props.name}`)"
      :aria-label="t(`product.${props.name}`)"
      :type="props.type"
      autocomplete="false"
      :aria-invalid="errors.length ? true : false"
      p="x4 y2"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
    >
    <span v-if="errorMessage" :id="`error-${props.name}`" role="status" text-red-900 text-sm mt-1>{{ errorMessage }}</span>
  </div>
</template>
