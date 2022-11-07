import { afterEach, describe, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../test/testUtils'

import ProductForm from '../src/components/ProductForm.vue'

describe('ProductForm', () => {
  afterEach(() => {
    cleanup()
  })

  test('valid fields', async () => {
    const { emitted } = render(ProductForm)

    const title = screen.getByLabelText('product.title')
    await userEvent.type(title, 'Product 1')

    const sku = screen.getByLabelText('product.sku')
    await userEvent.type(sku, 'sku-product-1')

    // get input, and type
    const price = screen.getByLabelText('product.price')
    await userEvent.type(price, '55')

    // get input, and type
    const basePrice = screen.getByLabelText('product.basePrice')
    await userEvent.type(basePrice, '44')

    // submit form
    const button = screen.getByRole('button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(emitted<any>().submit).toBeDefined()
    })

    const submitArg = emitted<any>().submit[0][0]
    expect(submitArg).toEqual(expect.objectContaining({
      basePrice: 44, price: 55, sku: 'sku-product-1', title: 'Product 1',
    }))
  })

  test('required fields', async () => {
    render(ProductForm)

    // submit form
    const button = screen.getByRole('button')
    fireEvent.click(button)

    await waitFor(() => {
      const errors = screen.getAllByRole('status')
      expect(errors).toHaveLength(2)
    })

    // const title = screen.getByLabelText('product.title')
    // expect(title).toHaveErrorMessage(/invalid time/i)
  })
})
