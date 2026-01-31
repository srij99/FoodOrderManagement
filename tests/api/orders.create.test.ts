import { POST } from "@/app/api/orders/route"
import { NextRequest } from "next/server"

describe("POST /api/orders", () => {
  it("should create a new order with valid data", async () => {
    const payload = {
      items: [{ menuItemId: "pizza-1", quantity: 2 }],
      customer: {
        name: "John Doe",
        address: "123 Main St",
        phone: "9999999999"
      }
    }

    const request = new NextRequest("http://localhost:3000/api/orders", {
      method: "POST",
      body: JSON.stringify(payload)
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data).toHaveProperty("orderId")
    expect(data).toHaveProperty("status")
    expect(data.status).toBe("Order Received")
  })

  it("should return 400 for invalid payload", async () => {
    const payload = {
      customer: {
        name: "",
        address: "",
        phone: ""
      }
    }

    const request = new NextRequest("http://localhost:3000/api/orders", {
      method: "POST",
      body: JSON.stringify(payload)
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
  })

  it("should return 400 when items array is empty", async () => {
    const payload = {
      items: [],
      customer: {
        name: "John",
        address: "123 Street",
        phone: "9999999999"
      }
    }

    const request = new NextRequest("http://localhost:3000/api/orders", {
      method: "POST",
      body: JSON.stringify(payload)
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
  })
})
