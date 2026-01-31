"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus } from "lucide-react"

type MenuCardProps = {
  id: string
  name: string
  description: string
  price: number
  image: string

  quantity: number
  onAdd: () => void
  onIncrease: () => void
  onDecrease: () => void
}

export default function MenuCard({
  name,
  description,
  price,
  image,
  quantity,
  onAdd,
  onIncrease,
  onDecrease
}: MenuCardProps) {
  return (
    <Card className="overflow-hidden pt-0">
      <img src={image} alt={name} className="h-70 w-full object-cover" />

      <CardContent>
        <h3 className="font-semibold text-lg">{name}</h3>

        <p className="text-sm text-muted-foreground">{description}</p>

        <div className="flex items-center justify-between pt-2 h-10">
          <span className="font-medium">₹{price.toFixed(2)}</span>

          {/* Button Area */}
          {quantity === 0 ? (
            <Button
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-50 transition-all"
              onClick={onAdd}
            >
              Add to Cart
            </Button>
          ) : (
            <div
              className="flex items-center bg-red-600 text-white  px-3 py-1
                         transition-all duration-300 scale-100 ease-out rounded-sm"
            >
              <button onClick={onDecrease} className="p-1 hover:bg-red-700 rounded-full transition">
                <Minus size={14} />
              </button>

              <span className="px-3 font-medium">{quantity}</span>

              <button onClick={onIncrease} className="p-1 hover:bg-red-700 rounded-full transition">
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
