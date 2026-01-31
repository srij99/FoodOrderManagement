export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export const menuItems: MenuItem[] = [
  {
    id: "pizza-1",
    name: "Margherita Pizza",
    description: "Classic cheese pizza",
    price: 299,
    image: "/images/pizza.jpg"
  },
  {
    id: "burger-1",
    name: "Cheeseburger",
    description: "Juicy burger",
    price: 199,
    image: "/images/burger.png"
  },
  {
    id: "salad-1",
    name: "Caesar Salad",
    description: "Fresh caesar salad",
    price: 400,
    image: "/images/salad.jpg"
  },
  {
    id: "soup-1",
    name: "Veg Manchow Soup",
    description: "Veg soup",
    price: 159,
    image: "/images/soup.jpg"
  },
  {
    id: "shawarma-1",
    name: "Fiery Chicken Shawarma",
    description: "Juicy Spicy Shawarma",
    price: 250,
    image: "/images/shawarma.jpg"
  },
  {
    id: "pasta-1",
    name: "Italiano Pasta",
    description: "Classic Italian Pasta",
    price: 300,
    image: "/images/pasta.png"
  }
]
