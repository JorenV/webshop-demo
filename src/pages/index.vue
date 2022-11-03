<script setup lang="ts">
import { useInfiniteQuery } from '@tanstack/vue-query'
import { getProductsInfinite } from '~/api/products'

const user = useUserStore()
const name = $ref(user.savedName)

const router = useRouter()
const go = () => {
  if (name)
    router.push(`/hi/${encodeURIComponent(name)}`)
}

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
    </div>
    <div flex flex-col items-center>
      <div v-for="page, index in data?.pages" :key="index" grid grid-cols-4 gap-6 max-w-screen-md>
        <div v-for="product in page.selectedProducts" :key="product.id" flex flex-col border dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200>
          <img :src="product.image" block max-w-full h-auto mb-3>
          <h3 text-lg mb-3>
            {{ product.title }}
          </h3>
          <button btn>
            {{ t('product.add_to_basket') }}
          </button>
        </div>
      </div>
      <button
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
