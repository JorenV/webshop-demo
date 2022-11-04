import type { ProductDTO } from '~/api/products'

export interface BasketDTO {
  id: number
  productId: number
  quantity: number
}

export interface Basket extends BasketDTO {
  product: ProductDTO
}

