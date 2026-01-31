import { create } from "zustand"
import { ORDER_STATUSES, OrderStatus } from "@/lib/orderStatus"

export type PlacedOrder = {
  orderId: string
  status: OrderStatus
  createdAt: number
  customer: {
    name: string
    address: string
    phone: string
  }
}

type OrderHistoryState = {
  orders: PlacedOrder[]
  addOrder: (
    orderId: string,
    customer: {
      name: string
      address: string
      phone: string
    }
  ) => void

  advanceStatus: (orderId: string) => void
}

export const useOrderHistoryStore = create<OrderHistoryState>((set) => ({
  orders: [],

  addOrder: (orderId, customer) =>
    set((state) => ({
      orders: [
        {
          orderId,
          status: "Order Received",
          createdAt: Date.now(),
          customer
        },
        ...state.orders
      ]
    })),

  advanceStatus: (orderId) =>
    set((state) => ({
      orders: state.orders.map((order) => {
        if (order.orderId !== orderId) return order

        const index = ORDER_STATUSES.indexOf(order.status)

        if (index < ORDER_STATUSES.length - 1) {
          return {
            ...order,
            status: ORDER_STATUSES[index + 1]
          }
        }

        return order
      })
    }))
}))
