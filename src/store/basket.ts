import { acceptHMRUpdate, defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { useToast } from 'vue-toast-notification'
import type { BasketDTO } from '~/api/basket'
import { addProductToBasket, getBasket, removeProductFromBasket } from '~/api/basket'

export const useBasketStore = defineStore('basket', () => {
  const { t } = useI18n()
  const toast = useToast()

  const uuid = '7a085bde-0672-4152-b469-ed4d7ace24ed'
  const items = ref<BasketDTO[]>([])

  const numberOfProducts = computed(() => items.value.length)

  async function fetch() {
    items.value = await getBasket(uuid)
  }

  async function add(id: number) {
    items.value = await addProductToBasket(uuid, id)
    toast.success(t('basket.product_added'))
  }

  async function remove(id: number) {
    items.value = await removeProductFromBasket(uuid, id)
    toast.success(t('basket.product_removed'))
  }

  return {
    items,
    uuid,
    numberOfProducts,
    fetch,
    add,
    remove,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
