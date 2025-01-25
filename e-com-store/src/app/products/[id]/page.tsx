'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useCart } from '@/lib/cart-context'

const product = {
  id: 1,
  name: 'Elegant Evening Gown',
  description: 'A stunning floor-length gown perfect for formal events and galas. Made with high-quality silk and adorned with delicate beading.',
  price: 2000,
  images: [
    '/greenEmaled.jpg?height=600&width=600',
    '/green2.jpg?height=600&width=600',
    '/elegantGown.jfif?height=600&width=600',
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  category: 'Dresses',
}

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [rentalDuration, setRentalDuration] = useState(3)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You must choose a size before adding to cart.",
        variant: "destructive",
      })
      return
    }
    if (rentalDuration < 1) {
      toast({
        title: "Invalid rental duration",
        description: "Rental duration must be at least 1 day.",
        variant: "destructive",
      })
      return
    }
    addToCart({ ...product, size: selectedSize, rentalDuration })
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedSize}) has been added to your cart for ${rentalDuration} days.`,
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-md overflow-hidden ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <Image src={image} alt={`${product.name} ${index + 1}`} width={100} height={100} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4 text-primary">{product.name}</h1>
            <p className="text-xl mb-4">Rs. {product.price.toFixed()} / day</p>
            <p className="mb-6">{product.description}</p>
            <div className="mb-6">
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                Size
              </label>
              <Select onValueChange={setSelectedSize} value={selectedSize}>
                <SelectTrigger id="size">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-6">
              <label htmlFor="rentalDuration" className="block text-sm font-medium text-gray-700 mb-2">
                Rental Duration (days)
              </label>
              <Input
                id="rentalDuration"
                type="number"
                min="1"
                value={rentalDuration}
                onChange={(e) => setRentalDuration(Math.max(1, parseInt(e.target.value)))}
                className="w-full"
              />
            </div>
            <Button onClick={handleAddToCart} className="w-full bg-primary hover:bg-primary/90">Add to Cart</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

