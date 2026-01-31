import { NextRequest, NextResponse } from "next/server"
import { orders } from "@/lib/orderStore"
import { ORDER_STATUSES } from "@/lib/orderStatus"

export async function PATCH(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params

  const order = orders.get(id)

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  }

  const currentIndex = ORDER_STATUSES.indexOf(order.status)

  if (currentIndex < ORDER_STATUSES.length - 1) {
    order.status = ORDER_STATUSES[currentIndex + 1]
    orders.set(id, order)
  }

  return NextResponse.json({ status: order.status }, { status: 200 })
}
