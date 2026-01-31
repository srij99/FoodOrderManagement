"use client"

import { useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { ORDER_STATUSES } from "@/lib/orderStatus"
import { useOrderHistoryStore } from "@/stores/orderHistoryStore"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  orderId: string | null
}

export default function OrderStatusModal({ open, onOpenChange, orderId }: Props) {
  const order = useOrderHistoryStore((s) => s.orders.find((o) => o.orderId === orderId))
  const advanceStatus = useOrderHistoryStore((s) => s.advanceStatus)

  useEffect(() => {
    if (!open || !orderId || !order) return

    const interval = setInterval(() => {
      advanceStatus(orderId)
    }, 5000)

    return () => clearInterval(interval)
  }, [open, orderId, order, advanceStatus])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-red-600">Order Status</DialogTitle>
        </DialogHeader>

        {!order ? (
          <p className="text-sm text-muted-foreground">Order not found.</p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">Order ID: {order.orderId}</p>

            <div className="mt-4 space-y-1 text-sm">
              <p className="font-medium">Delivery Details</p>

              <p className="text-muted-foreground">Customer Name: {order.customer.name}</p>

              <p className="text-muted-foreground">Address: {order.customer.address}</p>

              <p className="text-muted-foreground">Phone No: {order.customer.phone}</p>
            </div>

            {/* Status Progress */}
            <div className="flex justify-between mt-4">
              {ORDER_STATUSES.map((status) => {
                const active = ORDER_STATUSES.indexOf(status) <= ORDER_STATUSES.indexOf(order.status)

                return (
                  <span
                    key={status}
                    className={`text-xs font-medium ${active ? "text-red-600" : "text-muted-foreground"}`}
                  >
                    {status}
                  </span>
                )
              })}
            </div>
            {/* Progress Indicator */}
            <div className="mt-6 flex">
              <div className="mx-auto max-w-md">
                <div className="flex items-center">
                  {ORDER_STATUSES.map((_, index) => {
                    const currentIndex = ORDER_STATUSES.indexOf(order.status)
                    const isCompleted = index < currentIndex
                    const isCurrent = index === currentIndex

                    return (
                      <div key={index} className="flex items-center">
                        {/* Dot */}
                        <div
                          className={`rounded-full transition-all ${
                            isCompleted || isCurrent ? "bg-red-600" : "bg-gray-300"
                          } ${isCurrent ? "h-4 w-4" : "h-3 w-3"}`}
                        />

                        {/* Line */}
                        {index < ORDER_STATUSES.length - 1 && (
                          <div
                            className={`h-1 w-25 mx-2 transition-colors ${isCompleted ? "bg-red-600" : "bg-gray-300"}`}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <p className="text-sm">
              Current Status: <span className="font-medium text-red-600">{order.status}</span>
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
