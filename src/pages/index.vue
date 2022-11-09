<script setup lang="ts">
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { vElementVisibility } from '@vueuse/components'
import { getProducts } from '~/api/products'
import type { ProductDTO } from '~/api/products'
import { addProductToBasket } from '~/api/basket'

const basket = useBasketStore()

const { t } = useI18n()

const productsPerPage = 20
const queryClient = useQueryClient()

const fetchProducts = async ({ pageParam = 0 }) => {
  return await getProducts(pageParam, productsPerPage)
}

const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
  getNextPageParam: (lastPage, pages) => (lastPage.total > (productsPerPage * pages.length)) ? lastPage.page + 1 : undefined,
})

const products = computed((): ProductDTO[] | undefined => {
  return data.value?.pages.map(group => group.selectedProducts).flat()
})

function onMoreProductsButtonVisibility(isVisible: boolean) {
  if (isVisible)
    fetchNextPage()
}

const addMutation = useMutation({
  mutationFn: addProductToBasket,
  onSuccess: (data) => {
    queryClient.setQueryData(['basket'], data)
  },
})

const add = (id: number) => {
  addMutation.mutate({ basketId: basket.uuid, productId: id, quantity: 1 })
}
</script>

<template>
  <div>
    <div mb-5>
      <p text-xl mb-2>
        Webshop
      </p>
    </div>
    <Basket />
    <div flex flex-col items-center>
      <div grid grid-cols-4 gap-6 max-w-screen-md>
        <div v-for="product in products" :key="product.id" flex flex-col border dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200>
          <img :src="product.image" block max-w-full h-auto mb-3>
          <h3 text-lg mb-3>
            {{ product.title }}
          </h3>
          <p mb-3>
            &euro; {{ product.price }}
          </p>
          <button btn :disabled="!product.stocked" @click="add(product.id)">
            {{ product.stocked ? t('product.add_to_basket') : t('product.out_of_stock') }}
          </button>
        </div>
      </div>
      <button
        v-element-visibility="onMoreProductsButtonVisibility"
        :disabled="!hasNextPage || isFetchingNextPage"
        @click="fetchNextPage()"
      >
        {{ isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load More'
            : 'Nothing more to load' }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
