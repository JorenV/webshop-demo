import type { Products, Sort } from '~/types'

export const deleteProduct = async (id: number) => await fetch(`https://euricom-test-api.herokuapp.com/api/products/${id}`, { method: 'DELETE' })
  .then(response => response.json())

export const getProducts = async (page = 0, productsPerPage = 10, sort: Sort = 'title'): Promise<Products> =>
  await fetch(`https://euricom-test-api.herokuapp.com/api/products?page=${page}&pageSize=${productsPerPage}&sort=${sort}`)
    .then(response => response.json())

