<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useToast } from 'vue-toast-notification'

const props = defineProps<{ id: string }>()
const { t } = useI18n()
const toast = useToast()
// const router = useRouter()

const {
  isLoading,
  isError,
  error,
  data,
} = useQuery(['product', props.id],
  () => getProduct(parseInt(props.id)), {
    onSuccess: (data) => {
    },
  })

const mutation = useMutation(updateProduct, {
  onError: (error: string) => {
    toast.error(error)
  },
  onSuccess: () => {
    toast.success(t('product.updated'))
    // Invalidate and refetch
    // queryClient.invalidateQueries(['product'])
  },

})

const submit = () => {
  // mutation.mutate(data)
}
</script>

<template>
  <div>
    <div mb-5>
      <p text-xl mb-2>
        Webshop Admin
      </p>
      <router-link to="/admin" btn>
        {{ t('back') }}
      </router-link>
    </div>
    <div>
      <span v-if="isLoading">Loading...</span>
      <span v-else-if="isError">Error: {{ error }}</span>
      <div v-else-if="data">
        <input
          v-model="data.title"
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

        <button
          btn
          :disabled="!data.title"
          @click="submit"
        >
          {{ t('product.form.update') }}
        </button>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
