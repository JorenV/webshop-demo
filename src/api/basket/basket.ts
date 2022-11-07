import type { Basket, BasketDTO } from '~/api/basket'
import { get, getProduct, patch, post, remove } from '~/api'

const mapBasket = async (basket: BasketDTO[]): Promise<Basket[]> => {
  return await Promise.all(basket.map(async item => ({
    id: item.id,
    productId: item.productId,
    quantity: item.quantity,
    // TODO: don't add async data access in the map function
    product: await getProduct(item.productId),
  }) as Basket))
}

export const removeProductFromBasket = async (basketId: string, productId: number): Promise<Basket[]> => {
  const basket = await remove<BasketDTO[]>(`api/basket/${basketId}/product/${productId}`)
  return await mapBasket(basket)
}

export const updateQuantityForProductInBasket = async (basketId: string, productId: number, quantity = 1): Promise<Basket[]> => {
  const basket = await patch<BasketDTO[]>(`api/basket/${basketId}/product/${productId}`, { quantity })
  return await mapBasket(basket)
}

export const getBasket = async (id: string): Promise<Basket[]> => {
  const basket = await get<BasketDTO[]>(`api/basket/${id}`)
  return await mapBasket(basket)
}

export const addProductToBasket = async (basketId: string, productId: number, quantity = 1): Promise<Basket[]> => {
  const basket = await post<BasketDTO[]>(`api/basket/${basketId}/product/${productId}`, { quantity })
  return await mapBasket(basket)
}

