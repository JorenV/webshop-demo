import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface Product {
  basePrice: number
  desc: string
  id: number
  image: string
  price: number
  sku: string
  stocked: boolean
  title: string
}

export interface Products {
  total: number
  page: number
  pageSize: number
  selectedProducts: Product[]
}

export type Sort = keyof Product

export type ProductInput = Partial<Product>

