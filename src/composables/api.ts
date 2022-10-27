import type { Product, ProductInput, Products, Sort } from '~/types'

export const deleteProduct = async (id: number): Promise<Product> => await fetch(`https://euricom-test-api.herokuapp.com/api/products/${id}`, { method: 'DELETE' })
  .then(response => response.json())

export const getProducts = async (page = 0, productsPerPage = 10, sort: Sort = 'title'): Promise<Products> =>
  await fetch(`https://euricom-test-api.herokuapp.com/api/products?page=${page}&pageSize=${productsPerPage}&sort=${sort}`)
    .then(response => response.json())

export const createProduct = async (product: ProductInput): Promise<Product> => await fetch('https://euricom-test-api.herokuapp.com/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(product),
})
  .then(response => response.json())
  .then((response) => {
    if (response.code === 'Bad Request')
      throw new Error(response.message ? response.message : 'Oops.. something went wrong')

    return response
  })

export const updateProduct = async (product: Product): Promise<Product> => await fetch(`https://euricom-test-api.herokuapp.com/api/products/${product.id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(product),
})
  .then(response => response.json())
  .then((response) => {
    if (response.code === 'Bad Request')
      throw new Error(response.message ? response.message : 'Oops.. something went wrong')

    return response
  })

export const getProduct = async (id: number): Promise<Product> =>
  await fetch(`https://euricom-test-api.herokuapp.com/api/products/${id}`).then(
    response => response.json(),
  ).then((response) => {
    if (response.code)
      throw new Error(response.message ? response.message : 'Oops.. something went wrong')

    return response
  })
