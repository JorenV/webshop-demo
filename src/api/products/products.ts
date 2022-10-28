import type { Product, ProductInputDTO, ProductsDTO, Sort } from '~/api/products'

export const deleteProduct = async (id: number): Promise<Product> => await fetch(`https://euricom-test-api.herokuapp.com/api/products/${id}`, { method: 'DELETE' })
  .then(response => response.json())

export const getProducts = async (page = 0, productsPerPage = 10, sort: Sort = 'title'): Promise<ProductsDTO> =>
  await fetch(`https://euricom-test-api.herokuapp.com/api/products?page=${page}&pageSize=${productsPerPage}&sort=${sort}`)
    .then(response => response.json())
    // .then(dtos => dtos.map(dto => mapToEntity(dto)))

/**
 *
     const data = await get<ProductDTO[]>(`api/products?page=${page}&pageSize=${productsPerPage}&sort=${sort})

*/

export const createProduct = async (product: ProductInputDTO): Promise<Product> => await fetch('https://euricom-test-api.herokuapp.com/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(product),
})
  .then((response) => {
    if (response.ok)
      return response.json()
    throw new Error('RequestError')
  })
  .then((json) => {
    if (json.code === 'Bad Request')
      throw new Error(json.message ? json.message : 'Oops.. something went wrong')

    return json
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
