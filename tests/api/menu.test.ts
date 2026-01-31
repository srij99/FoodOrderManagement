import { GET } from "@/app/api/menu/route"
import { NextRequest } from "next/server"

describe("GET /api/menu", () => {
  it("should return the menu items", async () => {
    const request = new NextRequest("http://localhost:3000/api/menu")

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)

    const item = data[0]

    expect(item).toHaveProperty("id")
    expect(item).toHaveProperty("name")
    expect(item).toHaveProperty("description")
    expect(item).toHaveProperty("price")
    expect(item).toHaveProperty("image")
  })
})
