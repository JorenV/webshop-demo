import type { Basket, BasketDTO } from '~/api/basket'
import { get, patch, post, remove } from '~/api'

// const mapBasket = async (basket: BasketDTO[]): Promise<Basket[]> => {
//   return await Promise.all(basket.map(async item => ({
//     id: item.id,
//     productId: item.productId,
//     quantity: item.quantity,
//     product: {},
//   }) as Basket))
// }

export const removeProductFromBasket = async (params: { basketId: string; productId: number }): Promise<BasketDTO[]> => {
  return await remove<BasketDTO[]>(`api/basket/${params.basketId}/product/${params.productId}`)
}

export const updateQuantityForProductInBasket = async (params: { basketId: string; productId: number; quantity: number }): Promise<BasketDTO[]> => {
  return await patch<BasketDTO[]>(`api/basket/${params.basketId}/product/${params.productId}`, { quantity: params.quantity })
}

export const getBasket = async (id: string): Promise<BasketDTO[]> => {
  return await get<BasketDTO[]>(`api/basket/${id}`)
}

export const addProductToBasket = async (params: { basketId: string; productId: number; quantity: number }): Promise<BasketDTO[]> => {
  const {
    basketId,
    productId,
    quantity = 5,
  } = params
  return await post<BasketDTO[]>(`api/basket/${basketId}/product/${productId}`, { quantity })
}

