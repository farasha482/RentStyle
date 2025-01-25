import { NextResponse } from 'next/server'

const products = [
  { id: 1, name: 'Elegant Evening Gown', price: 2000, image: '/greenEmaled.jpg?height=300&width=300', category: 'Dresses' },
  { id: 2, name: 'Classic Tuxedo', price: 5000, image: '/tuxedo.jpg?height=300&width=300', category: 'Suits' },
  { id: 3, name: 'White Wedding Dress', price: 8000, image: '/whiteDress.jpg?height=300&width=300', category: 'Dresses' },
  { id: 4, name: 'red Wedding Dress', price: 7000, image: '/redWedding.jpg?height=300&width=300', category: 'Dresses' },
  { id: 5, name: 'Luxury Emaled Sari', price: 10000.99, image: '/GreenSari.jpg?height=300&width=300', category: 'Dresses' },
  { id: 6, name: 'Slim Fit Blazer', price: 2000, image: '/blazer.jpg?height=300&width=300', category: 'Jackets' },
  { id: 7, name: 'Off White Dress', price: 9000, image: '/fownWed.jpg?height=300&width=300', category: 'Dresses' },
  { id: 8, name: 'Black Tuxedo', price: 4000, image: '/blackTux.jpg?height=300&width=300', category: 'Suits' },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  let filteredProducts = products

  if (query) {
    filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    )
  }
  

  return NextResponse.json(filteredProducts)
}

