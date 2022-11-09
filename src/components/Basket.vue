<script setup lang="ts">
import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/vue-query'
import { getBasket, getProduct, removeProductFromBasket, updateQuantityForProductInBasket } from '~/api'
import type { Basket } from '~/api/basket'

const basket = useBasketStore()

const basketOpen = ref(false)

// const { t } = useI18n()

const { data } = useQuery(['basket'], () => getBasket(basket.uuid))

const basketItems = computed(() => {
  if (data.value) {
    return useQueries({
      queries:
        (data.value.map(item => ({
          queryKey: ['product', item.productId],
          queryFn: () => getProduct(item.productId),
          staleTime: Infinity,
        }))),
    })
  }
  return []
})

const fullBasket = computed(() => {
  if (basketItems.value && data.value) {
    return data.value.map(item => ({
      ...item,
      product: basketItems.value.filter(productQuery => productQuery.data?.id === item.productId)[0]?.data,
    }) as Basket)
  }
  return []
})

const total = computed(() => {
  let amount = 0
  fullBasket.value?.forEach((item) => {
    amount += ((item?.product?.price ? item.product.price : 0) * item.quantity)
  })
  return amount.toFixed(2)
})

const queryClient = useQueryClient()

const removeMutation = useMutation({
  mutationFn: removeProductFromBasket,
  onSuccess: (data) => {
    queryClient.setQueryData(['basket'], data)
  },
})

const remove = (id: number) => {
  removeMutation.mutate({ basketId: basket.uuid, productId: id })
}

const updateQuantity = useMutation({
  mutationFn: updateQuantityForProductInBasket,
  onSuccess: (data) => {
    queryClient.setQueryData(['basket'], data)
  },
})

const quantity = (id: number, quantity: number) => {
  updateQuantity.mutate({ basketId: basket.uuid, productId: id, quantity })
}

const numberOfProducts = computed(() => fullBasket.value?.length)
</script>

<template>
  <div fixed right-0 top-50 bg-teal-700 text-white z-10 rounded-l-lg>
    <button class="flex align-center !outline-none text-xl cursor-pointer p-4 hover:bg-teal-800 rounded-l-lg" @click="basketOpen = !basketOpen">
      <div i="carbon-shopping-cart" />
      <span ml-2 bg-teal-800 rounded-full px-2 py-1 text-sm>{{ numberOfProducts }}</span>
    </button>
    <div :class="basketOpen ? '' : 'hidden'">
      <div class="items">
        <div v-for="item in fullBasket" :key="item.id" flex flex-row w-80 p-4>
          <img :src="item.product?.image" block w-20 h-auto>
          <div pl-4 text-left>
            <h4 text-lg font-bold>
              {{ item.product?.title }}
            </h4>
            <div flex flex-row mt-1>
              <button class="icon-btn !outline-none" @click="quantity(item.productId, item.quantity - 1)">
                <div i="carbon-subtract-alt" />
              </button>
              <div mx-2>
                {{ item.quantity }}
              </div>
              <button class="icon-btn !outline-none" @click="quantity(item.productId, item.quantity + 1)">
                <div i="carbon-add-alt" />
              </button>
            </div>
            <button class="icon-btn !outline-none mt-1" @click="remove(item.productId)">
              <div i="carbon-trash-can" />
            </button>
          </div>
          <div v-if="item.product" grow text-right>
            &euro;{{ (item.product.price * item.quantity).toFixed(2) }}
          </div>
        </div>
      </div>
      <div text-right p-4 bg-teal-800>
        &euro;{{ total }}
      </div>
    </div>
  </div>
</template>
