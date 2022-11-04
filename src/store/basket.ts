import { acceptHMRUpdate, defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { useToast } from 'vue-toast-notification'
import type { Basket } from '~/api/basket'
import { addProductToBasket, getBasket, removeProductFromBasket, updateQuantityForProductInBasket } from '~/api/basket'

export const useBasketStore = defineStore('basket', () => {
  const { t } = useI18n()
  const toast = useToast()

  const uuid = ref<string>(uuidv4())
  const items = ref<Basket[]>([])

  const numberOfProducts = computed(() => items.value.length)

  const total = computed(() => {
    let amount = 0
    items.value.forEach((item) => {
      amount += (item.product.price * item.quantity)
    })
    return amount.toFixed(2)
  })

  async function fetch() {
    items.value = await getBasket(uuid.value)
  }

  async function add(id: number) {
    if (numberOfProducts.value >= 5) {
      toast.error(t('basket.maxiumum_reached'))
      return
    }
    items.value = await addProductToBasket(uuid.value, id)
    toast.success(t('basket.product_added'))
  }

  async function remove(id: number) {
    items.value = await removeProductFromBasket(uuid.value, id)
    toast.success(t('basket.product_removed'))
  }

  async function quantity(id: number, quantity: number) {
    items.value = await updateQuantityForProductInBasket(uuid.value, id, quantity)
    toast.success(t('basket.quantity_updated'))
  }

  function exists(id: number): boolean {
    return items.value.some(product => product.productId === id)
  }

  return {
    items,
    uuid,
    numberOfProducts,
    total,
    fetch,
    add,
    remove,
    exists,
    quantity,
  }
},
{
  persist: {
    paths: ['uuid'],
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
