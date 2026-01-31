"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}

type CartDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: CartItem[]
  onIncrease: (id: string) => void
  onDecrease: (id: string) => void
  onCheckout: () => void
}

export default function CartDrawer({ open, onOpenChange, items, onIncrease, onDecrease, onCheckout }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col h-full w-full sm:max-w-md p-5">
        {/* Header */}
        <SheetHeader>
          <SheetTitle className="text-red-600">Your Cart</SheetTitle>
        </SheetHeader>

        <Separator className="my-4" />

        {/* Scrollable Cart Items */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="icon" variant="outline" onClick={() => onDecrease(item.id)}>
                    −
                  </Button>

                  <span className="w-6 text-center">{item.quantity}</span>

                  <Button size="icon" variant="outline" onClick={() => onIncrease(item.id)}>
                    +
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Fixed Footer */}
        <div className="border-t pt-4">
          <div className="flex justify-between mb-4 font-medium">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <Button className="w-full bg-red-600 hover:bg-red-700" disabled={items.length === 0} onClick={onCheckout}>
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
