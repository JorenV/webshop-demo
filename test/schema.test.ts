import { describe, expect, it } from 'vitest'
import { schema } from '~/pages/admin/products/components/schema'

describe('schema', () => {
  it('should validate', () => {
    schema.parse({
      title: 'Product 1',
      sku: 'sku-product-1',
      price: 5,
      basePrice: 4,
      stocked: true,
    })
  })

  it('should not validate', () => {
    expect(() =>
      schema.parse({
        title: '',
        sku: 'sku-product-1',
        price: 5,
        basePrice: 4,
        stocked: true,
      }),
    ).toThrowError()
  })
})
