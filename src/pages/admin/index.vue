<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'

import type { Products } from '~/types'

async function getProducts(): Promise<Products> {
  return await fetch('https://euricom-test-api.herokuapp.com/api/products?page=0&pageSize=10')
    .then(response => response.json())
}

// const router = useRouter()

const { t } = useI18n()

// Access QueryClient instance

// Query
const { isLoading, isError, data, error } = useQuery(['products'], getProducts)
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
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
