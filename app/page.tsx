"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/layout/Navbar"
import CartDrawer from "@/components/layout/CartDrawer"
import MenuCard from "@/components/menu/MenuCard"
import { useCartStore } from "@/stores/cartStore"
import { useRouter } from "next/navigation"

type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)

  const router = useRouter()

  // Cart store
  const items = useCartStore((s) => s.items)
  const addItem = useCartStore((s) => s.addItem)
  const increase = useCartStore((s) => s.increaseQty)
  const decrease = useCartStore((s) => s.decreaseQty)
  const totalItems = useCartStore((s) => s.totalItems())

  const cartItems = useCartStore((s) => s.items)

  const getQuantity = (id: string) => cartItems.find((i) => i.id === id)?.quantity ?? 0

  useEffect(() => {
    async function fetchMenu() {
      const res = await fetch("/api/menu")
      const data = await res.json()
      setMenu(data)
      setLoading(false)
    }

    fetchMenu()
  }, [])

  return (
    <>
      <Navbar showCart cartItemCount={totalItems} onCartClick={() => setCartOpen(true)} />

      <main className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <p className="text-muted-foreground">Loading menu…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menu.map((item) => (
              <MenuCard
                key={item.id}
                {...item}
                quantity={getQuantity(item.id)}
                onAdd={() =>
                  addItem({
                    id: item.id,
                    name: item.name,
                    price: item.price
                  })
                }
                onIncrease={() => increase(item.id)}
                onDecrease={() => decrease(item.id)}
              />
            ))}
          </div>
        )}
      </main>

      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={items}
        onIncrease={increase}
        onDecrease={decrease}
        onCheckout={() => router.push("/checkout")}
      />
    </>
  )
}
