import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useBasketStore } from '~/store/basket'

describe('basket', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })
  it('products total and amount functions', () => {
    const basket = useBasketStore()
    expect(basket.numberOfProducts).toBe(0)
    expect(basket.total).toBe('0.00')

    basket.items = [
      {
        id: 1,
        productId: 3,
        quantity: 4,
        product: {
          id: 3,
          title: 'Product 1',
          sku: 'sku-product-1',
          price: 5.1,
          basePrice: 4,
          stocked: false,
          image: '/images/products/test.png',
        },
      },
    ]

    expect(basket.numberOfProducts).toBe(1)
    expect(basket.total).toBe('20.40')

    // counter.increment()
    // expect(counter.n).toBe(1)
  })
})
