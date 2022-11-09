import { acceptHMRUpdate, defineStore } from 'pinia'
// @ts-expect-error uuid has no declaration file
import { v4 as uuidv4 } from 'uuid'
export const useBasketStore = defineStore('basket', () => {
  const uuid = ref<string>('test')

  return {
    uuid,
  }
},
{
  persist: {
    paths: ['uuid'],
    debug: true,
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useBasketStore, import.meta.hot))
