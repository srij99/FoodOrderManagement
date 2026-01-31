import { z } from "zod"

export const orderItemSchema = z.object({
  menuItemId: z.string().min(1),
  quantity: z.number().int().positive()
})

export const customerSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().min(10)
})

export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1),
  customer: customerSchema
})
