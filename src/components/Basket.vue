<script setup lang="ts">
const basket = useBasketStore()
basket.fetch()
const basketOpen = ref(false)
</script>

<template>
  <div fixed right-0 top-50 bg-teal-700 text-white z-10 rounded-l-lg>
    <button class="flex align-center !outline-none text-xl cursor-pointer p-4 hover:bg-teal-800 rounded-l-lg" @click="basketOpen = true">
      <div i="carbon-shopping-cart" />
      <span ml-2 bg-teal-800 rounded-full px-2 py-1 text-sm>{{ basket.numberOfProducts }}</span>
    </button>
    <div :class="basketOpen ? '' : 'hidden'">
      <div class="items">
        <div v-for="product in basket.items" :key="product.id" flex flex-row w-80 p-4>
          <div>
            ProductId: {{ product.productId }}
          </div>
          <div px-2>
            <button @click="basket.quantity(product.productId, product.quantity - 1)">
              Remove
            </button>
            Quantity: {{ product.quantity }}
            <button @click="basket.quantity(product.productId, product.quantity + 1)">
              Add
            </button>
          </div>
          <button class="icon-btn mx-2 !outline-none" @click="basket.remove(product.productId)">
            <div i="carbon-trash-can" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
