import { GET } from "@/app/api/orders/[id]/route"
import { NextRequest } from "next/server"
import { orders } from "@/lib/orderStore"

describe("GET /api/orders/:id", () => {
  it("should return order details for a valid order id", async () => {
    // Arrange: seed an order
    const orderId = "test-order-1"

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

    const request = new NextRequest(`http://localhost:3000/api/orders/${orderId}`)

    // Act
    const response = await GET(request, {
      params: { id: orderId }
    })

    const data = await response.json()

    // Assert
    expect(response.status).toBe(200)
    expect(data.id).toBe(orderId)
    expect(data.status).toBe("Order Received")
    expect(data.items.length).toBe(1)
  })

  it("should return 404 for non-existent order id", async () => {
    const request = new NextRequest("http://localhost:3000/api/orders/unknown-id")

    const response = await GET(request, {
      params: { id: "unknown-id" }
    })

    expect(response.status).toBe(404)
  })
})
