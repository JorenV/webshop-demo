import type { BasketDTO } from '~/api/basket'
import { get, post, put, remove } from '~/api'

export const removeProductFromBasket = async (basketId: string, productId: number): Promise<BasketDTO[]> => {
  return await remove<BasketDTO[]>(`api/basket/${basketId}/product/${productId}`)
}

export const updateQuantityForProductInBasket = async (params: { id: number; product: ProductInputDTO }): Promise<ProductDTO> => {
  return await put<ProductDTO>(`api/products/${params.id}`, params.product)
}

export const getBasket = async (id: string): Promise<BasketDTO[]> => {
  return await get<BasketDTO[]>(`api/basket/${id}`)
}

export const addProductToBasket = async (basketId: string, productId: number, quantity = 1): Promise<BasketDTO[]> => {
  return await post<BasketDTO[]>(`api/basket/${basketId}/product/${productId}`, { quantity })
}
