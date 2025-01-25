import Image from 'next/image'
import Link from 'next/link'

const featuredItems = [
  { id: 1, name: 'Elegant Evening Gown', price: 2000, image: '/elegantGown.jfif?height=300&width=300' },
  { id: 2, name: 'Classic Tuxedo', price: 5000, image: '/tuxedo.jpg?height=300&width=300' },
  { id: 3, name: 'White Wedding Dress', price: 8000, image: '/whiteDress.jpg?height=300&width=300' },
  { id: 4, name: 'Red Wedding Dress', price: 7000, image: '/redWedding.jpg?height=300&width=300' },
]

export default function FeaturedItems() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredItems.map((item) => (
            <Link href={`/products/${item.id}`} key={item.id} className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                <Image src={item.image} alt={item.name} width={300} height={300} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 group-hover:underline">{item.name}</h3>
                  <p className="text-gray-600">Rs.{item.price.toFixed()} / day</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

