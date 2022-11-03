import { acceptHMRUpdate, defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { useToast } from 'vue-toast-notification'
import type { BasketDTO } from '~/api/basket'
import { addProductToBasket, getBasket, removeProductFromBasket, updateQuantityForProductInBasket } from '~/api/basket'

export const useBasketStore = defineStore('basket', () => {
  const { t } = useI18n()
  const toast = useToast()

  const uuid = '454'
  const items = ref<BasketDTO[]>([])

  const numberOfProducts = computed(() => items.value.length)

  async function fetch() {
    items.value = await getBasket(uuid)
  }

  async function add(id: number) {
    if (numberOfProducts.value >= 5) {
      toast.error(t('basket.maxiumum_reached'))
      return
    }

    items.value = await addProductToBasket(uuid, id)
    toast.success(t('basket.product_added'))
  }

  async function remove(id: number) {
    items.value = await removeProductFromBasket(uuid, id)
    toast.success(t('basket.product_removed'))
  }

  async function quantity(id: number, quantity: id) {
    items.value = await updateQuantityForProductInBasket(uuid, id, quantity)
    toast.success(t('basket.quantity_updated'))
  }

  function exists(id: number) {
    return items.value.some(product => product.productId === id)
  }

  return {
    items,
    uuid,
    numberOfProducts,
    fetch,
    add,
    remove,
    exists,
    quantity,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
