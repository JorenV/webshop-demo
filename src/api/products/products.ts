import { useToast } from 'vue-toast-notification'
import type { ProductDTO, ProductInputDTO, ProductsDTO, Sort } from '~/api/products'

const url = 'https://euricom-test-api.herokuapp.com/'
const toast = useToast()

// @TODO move get, post, put, remove and responseHandling functions to own file
const responseHandling = (response: Response) => {
  if (!response.ok) {
    toast.error('Oops.. something went wrong')
    throw new Error(response.statusText)
  }
  return response.json()
}

const get = async <T>(path: string): Promise<T> => {
  const response = await fetch(url + path)
  return responseHandling(response)
}

const post = async <T>(path: string, obj: object): Promise<T> => {
  const response = await fetch(url + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
  return responseHandling(response)
}

const put = async <T>(path: string, obj: object): Promise<T> => {
  const response = await fetch(url + path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
  return responseHandling(response)
}

const remove = async <T>(path: string): Promise<T> => {
  const response = await fetch(url + path, {
    method: 'DELETE',
  })
  return responseHandling(response)
}

export const deleteProduct = async (id: number): Promise<ProductDTO> => {
  return await remove <ProductDTO>(`api/products/${id}`)
}

export const getProducts = async (page = 0, productsPerPage = 10, sort: Sort = 'title'): Promise<ProductsDTO> => {
  return await get<ProductsDTO>(`api/products?page=${page}&pageSize=${productsPerPage}&sort=${sort}`)
}

export const createProduct = async (product: ProductInputDTO): Promise<ProductDTO> => {
  return await post<ProductDTO>('api/products', product)
}

export const updateProduct = async (product: ProductDTO): Promise<ProductDTO> => {
  return await put<ProductDTO>(`api/products/${product.id}`, product)
}

export const getProduct = async (id: number): Promise<ProductDTO> => {
  return await get<ProductDTO>(`api/products/${id}`)
}

