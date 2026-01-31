"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import CartDrawer from "@/components/layout/CartDrawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/stores/cartStore"
import { toast } from "sonner"
import { useOrderHistoryStore } from "@/stores/orderHistoryStore"
import OrderStatusModal from "@/components/orders/OrderStatusModel"

export default function CheckoutPage() {
  const router = useRouter()
  const [cartOpen, setCartOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  // Cart store
  const items = useCartStore((s) => s.items)
  const totalItems = useCartStore((s) => s.totalItems())
  const totalPrice = useCartStore((s) => s.totalPrice())
  const clearCart = useCartStore((s) => s.clearCart)
  const increase = useCartStore((s) => s.increaseQty)
  const decrease = useCartStore((s) => s.decreaseQty)

  // Form state
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")

  const addOrder = useOrderHistoryStore((s) => s.addOrder)
  const orders = useOrderHistoryStore((s) => s.orders)

  async function handlePlaceOrder() {
    if (!name || !address || !phone) {
      toast.error("Please fill in all delivery details.")

      return
    }

    if (items.length === 0) {
      toast.error("Your cart is empty.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            menuItemId: i.id,
            quantity: i.quantity
          })),
          customer: { name, address, phone }
        })
      })

      if (!res.ok) throw new Error()

      const data = await res.json()

      // ✅ success toast
      toast.success("Order placed successfully")

      // ✅ store order locally
      addOrder(data.orderId, {
        name,
        address,
        phone
      })

      // ✅ clear cart
      clearCart()
      setName("")
      setAddress("")
      setPhone("")
    } catch {
      toast.error(`Something went wrong. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar showCart cartItemCount={totalItems} onCartClick={() => setCartOpen(true)} />

      <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Delivery Details */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-red-600">Delivery Details</h2>

            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Address</Label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700" disabled={loading} onClick={handlePlaceOrder}>
              {loading ? "Placing Order…" : "Place Order"}
            </Button>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <Separator />

            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </main>

      {orders.length > 0 && (
        <Card className="max-w-6xl mx-auto">
          <CardContent className="p-2 space-y-4">
            <div className="max-w-6xl mx-auto px-6 pb-10">
              <h2 className="text-lg font-semibold mb-4">Your Orders</h2>

              <div className="border rounded-md divide-y">
                {orders.map((order) => (
                  <div key={order.orderId} className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm font-medium">Order ID: {order.orderId}</p>
                      <p className="text-sm text-muted-foreground">Status: {order.status}</p>
                    </div>

                    <Button
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => {
                        setSelectedOrderId(order.orderId)
                        setStatusOpen(true)
                      }}
                    >
                      Check Status
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cart Drawer (read-only behavior by convention) */}
      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={items}
        onIncrease={increase}
        onDecrease={decrease}
        onCheckout={() => {}}
      />

      <OrderStatusModal open={statusOpen} onOpenChange={setStatusOpen} orderId={selectedOrderId} />
    </>
  )
}
