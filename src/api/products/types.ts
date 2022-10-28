export interface ProductDTO {
  basePrice: number
  desc: string
  id: number
  image: string
  price: number
  sku: string
  stocked: boolean
  title: string
}

export interface Product extends ProductDTO {
  // noop
}

export interface ProductsDTO {
  total: number
  page: number
  pageSize: number
  selectedProducts: ProductDTO[]
}

export type Sort = keyof ProductDTO

export type ProductInputDTO = Partial<ProductDTO>

