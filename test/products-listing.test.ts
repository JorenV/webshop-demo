import { describe, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../test/testUtils'

import Index from '../src/pages/admin/products/index.vue'
import { server } from './mocks/mockServer'
import type { ProductsDTO } from '~/api/products'

describe('products listing', () => {
  test('api lists products', async () => {
    render(Index)

    server.resetHandlers(rest.get('*/api/products?page=:page&pageSize=:productsPerPage&sort=:sort', (req, res, ctx) => {
      return res(
        ctx.json(<ProductsDTO>{
          total: 100,
          page: 1,
          pageSize: 10,
          selectedProducts: [
            {
              id: 3,
              title: 'Product 1',
              sku: 'sku-product-1',
              price: 5.1,
              basePrice: 4,
              stocked: false,
              image: '/images/products/test.png',
            },
            {
              id: 4,
              title: 'Product 2',
              sku: 'sku-product-2',
              price: 66,
              basePrice: 3,
              stocked: false,
              image: '/images/products/test2.png',
            },
          ],

        }),
      )
    }))

    await waitFor(() => {
      const products = screen.getAllByRole('listitem')
      expect(products).toHaveLength(2)
    })
  })
})
