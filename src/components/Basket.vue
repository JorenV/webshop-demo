<script setup lang="ts">
const basket = useBasketStore()
basket.fetch()
const basketOpen = ref(false)
const { t } = useI18n()
</script>

<template>
  <div fixed right-0 top-50 bg-teal-700 text-white z-10 rounded-l-lg>
    <button class="flex align-center !outline-none text-xl cursor-pointer p-4 hover:bg-teal-800 rounded-l-lg" @click="basketOpen = !basketOpen">
      <div i="carbon-shopping-cart" />
      <span ml-2 bg-teal-800 rounded-full px-2 py-1 text-sm>{{ basket.numberOfProducts }}</span>
    </button>
    <div :class="basketOpen ? '' : 'hidden'">
      <div class="items">
        <div v-for="item in basket.items" :key="item.id" flex flex-row w-80 p-4>
          <img :src="item.product.image" block w-20 h-auto>
          <div pl-4 text-left>
            <h4 text-lg font-bold>
              {{ item.product?.title }}
            </h4>
            <div flex flex-row mt-1>
              <button class="icon-btn !outline-none" @click="basket.quantity(item.productId, item.quantity - 1)">
                <div i="carbon-subtract-alt" />
              </button>
              <div mx-2>
                {{ item.quantity }}
              </div>
              <button class="icon-btn !outline-none" @click="basket.quantity(item.productId, item.quantity + 1)">
                <div i="carbon-add-alt" />
              </button>
            </div>
            <button class="icon-btn !outline-none mt-1" @click="basket.remove(item.productId)">
              <div i="carbon-trash-can" />
            </button>
          </div>
          <div grow text-right>
            &euro;{{ item.product.price * item.quantity }}
          </div>
        </div>
      </div>
      <div text-right p-4 border-t>
        &euro;{{ basket.total }}
      </div>
    </div>
  </div>
</template>
