import { describe, expect, test, vi } from 'vitest'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import { createI18n } from 'vue-i18n'

import ProductForm from '../src/components/ProductForm.vue'

const i18n = createI18n({
  messages: {
    en: {},
  },
})

describe('ProductForm', () => {
  test('submit', async () => {
    const { emitted } = render(ProductForm, {
      global: {
        plugins: [i18n],
      },
    })

    // submit form
    const button = screen.getByRole('button')
    // fireEvent.click(button)

    // expect title field to have error
    // const errors = screen.getByRole('error', { name: 'String must contain at least 1 character(s)' })

    // get input, and type 'Product 1'
    const title = screen.getByLabelText('product.title')
    await userEvent.type(title, 'Product 1')

    // get input, and type
    const sku = screen.getByLabelText('product.sku')
    await userEvent.type(sku, 'sku-product-1')

    // get input, and type
    const price = screen.getByLabelText('product.price')
    await userEvent.type(price, '55')

    // get input, and type
    const basePrice = screen.getByLabelText('product.basePrice')
    await userEvent.type(basePrice, '44')

    // get checkbox and click
    const stocked = screen.getByLabelText('product.stocked')
    fireEvent.click(stocked)

    // submit form
    fireEvent.click(button)

    const submitArg = emitted<any>().submit[0][0]
    expect(submitArg).toEqual({
      title: 'Product 1',
      sku: 'sku-product-1',
      price: 55,
      basePrice: 44,
      stocked: true,
    })
  })
})
