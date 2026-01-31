import { OrderStatus } from "./orderStatus"

export type OrderItem = {
  menuItemId: string
  quantity: number
}

export type CustomerDetails = {
  name: string
  address: string
  phone: string
}

export type Order = {
  id: string
  items: OrderItem[]
  customer: CustomerDetails
  status: OrderStatus
  createdAt: number
}

export const orders = (global as any).orders ?? ((global as any).orders = new Map())
