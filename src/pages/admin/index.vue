<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import type { ComputedRef } from 'vue'

import type { Products } from '~/types'

const productsPerPage = 15

async function getProducts(page = 0): Promise<Products> {
  return await fetch(`https://euricom-test-api.herokuapp.com/api/products?page=${page}&pageSize=${productsPerPage}`)
    .then(response => response.json())
}

// const router = useRouter()

const { t } = useI18n()

// Access QueryClient instance

// Query
const page = ref(0)

const setPage = (pageNumber: number) => {
  page.value = pageNumber
}

const {
  isLoading,
  isError,
  error,
  data,
  isFetching,
  isPreviousData,
} = useQuery(['projects', page], () => getProducts(page.value), { keepPreviousData: true })

const numberOfPages: ComputedRef<number> = computed((): number => Math.ceil((data.value?.total ?? 0) / productsPerPage))
</script>

<template>
  <div>
    <p>
      Webshop Admin
    </p>
    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">Error: {{ error }}</span>
    <!-- We can assume by this point that `isSuccess === true` -->
    <table v-else table-auto inline-block>
      <thead>
        <tr>
          <th border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left>
            {{ t('product.title') }}
          </th>
          <th border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left>
            {{ t('product.image') }}
          </th>
          <th border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left>
            {{ t('product.price') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in data?.selectedProducts" :key="product.id">
          <td border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400>
            {{ product.title }}
          </td>
          <td border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400>
            <img :src="product.image" block w-20 h-auto>
          </td>
          <td border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400>
            {{ product.price }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="numberOfPages > 1">
      <button @click="setPage(page - 1)">
        Previous Page
      </button>
      <span>Page: {{ page + 1 }}/{{ numberOfPages }}</span>
      <button :disabled="isPreviousData" @click="setPage(page + 1)">
        Next Page
      </button>
    </div>
    <span v-if="isFetching"> Loading...</span>
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
