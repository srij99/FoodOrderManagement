"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type NavbarProps = {
  showCart?: boolean
  cartItemCount?: number
  onCartClick?: () => void
}

export default function Navbar({ showCart = false, cartItemCount = 0, onCartClick }: NavbarProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
      {/* App Title */}
      <h1 className="text-xl font-semibold text-red-600">Foodie - Food Order App</h1>

      {/* Cart Icon */}
      {showCart && (
        <Button variant="ghost" size="icon" className="relative" onClick={onCartClick}>
          <ShoppingCart className="h-6 w-6 text-red-600" />

          {cartItemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 flex items-center justify-center text-xs bg-red-600 text-white">
              {cartItemCount}
            </Badge>
          )}
        </Button>
      )}
    </header>
  )
}
