import { NextRequest, NextResponse } from "next/server"
import { createOrderSchema } from "@/lib/validators"
import { orders, Order } from "@/lib/orderStore"
import { ORDER_STATUSES } from "@/lib/orderStatus"

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = createOrderSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
  }

  const orderId = crypto.randomUUID()

  const newOrder: Order = {
    id: orderId,
    items: parsed.data.items,
    customer: parsed.data.customer,
    status: ORDER_STATUSES[0], // "Order Received"
    createdAt: Date.now()
  }

  orders.set(orderId, newOrder)

  return NextResponse.json(
    {
      orderId,
      status: newOrder.status
    },
    { status: 201 }
  )
}
