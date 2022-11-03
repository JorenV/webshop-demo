<script setup lang="ts">
import { useInfiniteQuery } from '@tanstack/vue-query'
import { vElementVisibility } from '@vueuse/components'
import { getProductsInfinite } from '~/api/products'
import type { ProductDTO } from '~/api/products'

const basket = useBasketStore()

basket.fetch()

const { t } = useI18n()

const productsPerPage = 20

const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ['products'],
  queryFn: getProductsInfinite,
  getNextPageParam: (lastPage, pages) => (lastPage.total > (productsPerPage * pages.length)) ? lastPage.page + 1 : undefined,
})

const products = computed((): ProductDTO[] | undefined => {
  return data.value?.pages.map(group => group.selectedProducts).flat()
})

function onMoreProductsButtonVisibility(isVisible: boolean) {
  if (isVisible)
    fetchNextPage()
}
</script>

<template>
  <div>
    <div mb-5>
      <p text-xl mb-2>
        Webshop
      </p>
      <button class="icon-btn mx-2 !outline-none text-xl">
        <div i="carbon-shopping-cart" />
      </button>
      <span>{{ basket.numberOfProducts }} products in card</span>
      <div v-for="product in basket.items" :key="product.id">
        ProductId: {{ product.productId }}
        <button class="icon-btn mx-2 !outline-none" @click="basket.remove(product.productId)">
          <div i="carbon-trash-can" />
        </button>
      </div>
    </div>
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
          <button btn :disabled="!product.stocked" @click="basket.add(product.id)">
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
