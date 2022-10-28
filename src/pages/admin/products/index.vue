<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'vue-toast-notification'
import { deleteProduct, getProducts } from '~/api/products'
import type { Sort } from '~/api/products'

const { t } = useI18n()
const toast = useToast()
const queryClient = useQueryClient()
const productsPerPage = 15
const sort = ref<Sort>('title')
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
} = useQuery(['products', page, sort], () => getProducts(page.value, productsPerPage, sort.value), { keepPreviousData: true })

const numberOfPages = computed((): number => Math.ceil((data.value?.total ?? 0) / productsPerPage))

const deleteMutation = useMutation(deleteProduct, {
  onSuccess: () => {
    toast.success(t('product.removed'))
    // Invalidate and refetch
    queryClient.invalidateQueries(['products'])
  },
})

const removeProduct = (id: number) => {
  deleteMutation.mutate(id)
}
</script>

<template>
  <div>
    <div mb-5>
      <p text-xl mb-2>
        Webshop Admin
      </p>
      <router-link to="/admin/products/create" btn>
        {{ t('product.create') }}
      </router-link>
    </div>

    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">Error: {{ error }}</span>
    <table v-else table-auto inline-block>
      <thead>
        <tr>
          <th border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left>
            <div flex items-end>
              {{ t('product.title') }}
              <div i-carbon-caret-up block cursor-pointer hover:text-teal-700 :class="sort === 'title' ? 'text-teal-700' : '' " @click="sort = 'title'" />
            </div>
          </th>
          <th border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left>
            {{ t('product.image') }}
          </th>
          <th border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left>
            <div flex items-end>
              {{ t('product.sku') }}
              <div i-carbon-caret-up block cursor-pointer hover:text-teal-700 :class="sort === 'sku' ? 'text-teal-700' : '' " @click="sort = 'sku'" />
            </div>
          </th>
          <th border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left>
            <div flex items-end>
              {{ t('product.stocked') }}
              <div i-carbon-caret-up block cursor-pointer hover:text-teal-700 :class="sort === 'stocked' ? 'text-teal-700' : '' " @click="sort = 'stocked'" />
            </div>
          </th>
          <th border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left>
            <div flex items-end>
              {{ t('product.price') }}
              <div i-carbon-caret-up block cursor-pointer hover:text-teal-700 :class="sort === 'price' ? 'text-teal-700' : '' " @click="sort = 'price'" />
            </div>
          </th>
          <th border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left>
            <div flex items-end>
              {{ t('product.basePrice') }}
              <div i-carbon-caret-up block cursor-pointer hover:text-teal-700 :class="sort === 'basePrice' ? 'text-teal-700' : '' " @click="sort = 'basePrice'" />
            </div>
          </th>
          <th border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left>
            {{ t('product.actions') }}
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
            {{ product.sku }}
          </td>
          <td border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400>
            {{ product.stocked }}
          </td>
          <td border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400>
            {{ product.price }}
          </td>
          <td border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400>
            {{ product.basePrice }}
          </td>
          <td border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400>
            <router-link :to="`/admin/products/${product.id}`" class="icon-btn mx-2 !outline-none">
              <div i="carbon-edit" />
            </router-link>
            <button class="icon-btn mx-2 !outline-none" @click="removeProduct(product.id)">
              <div i="carbon-trash-can" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="numberOfPages > 1" grid grid-flow-col auto-cols-max gap-3 justify-center mt-4>
      <button :disabled="isPreviousData || page === 0" btn @click="setPage(page - 1)">
        {{ t('pagination.prev') }}
      </button>
      <div flex items-center>
        {{ page + 1 }}/{{ numberOfPages }}
      </div>
      <button :disabled="isPreviousData || page + 1 >= numberOfPages" btn @click="setPage(page + 1)">
        {{ t('pagination.next') }}
      </button>
    </div>
    <span v-if="isFetching"> Loading...</span>
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
