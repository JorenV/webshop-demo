import { describe, expect, it } from 'vitest'
import { schema } from '~/pages/admin/products/components/schema'

describe('schema', () => {
  it('should validate', () => {
    const result = schema.safeParse({
      title: 'Product 1',
      sku: 'sku-product-1',
      price: 5,
      basePrice: 4,
      stocked: true,
    })
    expect(result.success).toBeTruthy()
  })

  it('required', () => {
    const result = schema.safeParse({ /* empty */ })
    expect.assertions(1)
    if (!result.success)
      expect(result.error.errors).toHaveLength(5)
  })

  it('should not validate', () => {
    const result = schema.safeParse({
      title: '',
      sku: '',
      price: 'high',
      basePrice: 'higher',
      stocked: 'in stock',
    })
    expect.assertions(5)
    if (!result.success) {
      const errors = result.error.flatten()

      expect(errors.fieldErrors.title[0]).toEqual('String must contain at least 1 character(s)')
      expect(errors.fieldErrors.sku[0]).toEqual('String must contain at least 1 character(s)')
      expect(errors.fieldErrors.price[0]).toEqual('Expected number, received string')
      expect(errors.fieldErrors.basePrice[0]).toEqual('Expected number, received string')
      expect(errors.fieldErrors.stocked[0]).toEqual('Expected boolean, received string')

      // expect(result.error.errors).toEqual(expect.arrayContaining([
      //   expect.objectContaining({
      //     path: ['sku'],
      //     message: 'invalid sku',
      //   }),
      // ]))
    }
  })
})
