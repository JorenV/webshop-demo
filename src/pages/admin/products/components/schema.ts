import * as zod from 'zod'

export const schema
  = zod.object({
    title: zod.string().min(1),
    sku: zod.string().min(1),
    price: zod.number(),
    basePrice: zod.number(),
    stocked: zod.boolean(),
  })
