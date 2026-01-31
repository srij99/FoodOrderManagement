import { PATCH } from "@/app/api/orders/[id]/status/route"
import { NextRequest } from "next/server"
import { orders } from "@/lib/orderStore"

describe("PATCH /api/orders/:id/status", () => {
  it("should advance order status to the next step", async () => {
    const orderId = "status-test-1"

    orders.set(orderId, {
      id: orderId,
      items: [{ menuItemId: "pizza-1", quantity: 1 }],
      customer: {
        name: "John",
        address: "123 Street",
        phone: "9999999999"
      },
      status: "Order Received",
      createdAt: Date.now()
    })

    const request = new NextRequest(`http://localhost:3000/api/orders/${orderId}/status`, { method: "PATCH" })

    const response = await PATCH(request, {
      params: { id: orderId }
    })

    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.status).toBe("Preparing")
  })

  it("should not advance status past Delivered", async () => {
    const orderId = "status-test-2"

    orders.set(orderId, {
      id: orderId,
      items: [],
      customer: {
        name: "Jane",
        address: "456 Street",
        phone: "8888888888"
      },
      status: "Delivered",
      createdAt: Date.now()
    })

    const request = new NextRequest(`http://localhost:3000/api/orders/${orderId}/status`, { method: "PATCH" })

    const response = await PATCH(request, {
      params: { id: orderId }
    })

    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.status).toBe("Delivered")
  })

  it("should return 404 for invalid order id", async () => {
    const request = new NextRequest("http://localhost:3000/api/orders/invalid-id/status", { method: "PATCH" })

    const response = await PATCH(request, {
      params: { id: "invalid-id" }
    })

    expect(response.status).toBe(404)
  })
})
