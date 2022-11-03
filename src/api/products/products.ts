import type { ProductDTO, ProductInputDTO, ProductsDTO, Sort } from '~/api/products'
import { get, post, put, remove } from '~/api'

export const deleteProduct = async (id: number): Promise<ProductDTO> => {
  return await remove<ProductDTO>(`api/products/${id}`)
}

export const getProducts = async (page = 0, productsPerPage = 10, sort: Sort = 'title'): Promise<ProductsDTO> => {
  return await get<ProductsDTO>(`api/products?page=${page}&pageSize=${productsPerPage}&sort=${sort}`)
}

export const getProductsInfinite = async ({ pageParam = 0 }): Promise<ProductsDTO> => {
  return await get<ProductsDTO>(`api/products?page=${pageParam}&sort=title`)
}

export const createProduct = async (product: ProductInputDTO): Promise<ProductDTO> => {
  return await post<ProductDTO>('api/products', product)
}

export const updateProduct = async (params: { id: number; product: ProductInputDTO }): Promise<ProductDTO> => {
  return await put<ProductDTO>(`api/products/${params.id}`, params.product)
}

export const getProduct = async (id: number): Promise<ProductDTO> => {
  return await get<ProductDTO>(`api/products/${id}`)
}

