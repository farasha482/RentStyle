'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/lib/cart-context'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, updateRentalDuration, clearCart } = useCart()
  const router = useRouter()

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity * item.rentalDuration, 0)
  const tax = subtotal * 0.1 // Assuming 10% tax
  const total = subtotal + tax
/*
  const handleCheckout = () => {
    // Implement checkout logic here
    console.log('Proceeding to checkout with:', { cart, total })
    alert('Checkout functionality not implemented yet.')
  }*/
    const handleCheckout = () => {
      if (cart.length === 0) {
        toast({
          title: "Cart is empty",
          description: "Please add items to your cart before proceeding to checkout.",
          variant: "destructive",
        })
        return
      }
      router.push('/checkout')
    }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-primary">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="grid gap-8 mb-8">
              {cart.map((item) => {
                const imageUrl = item.images && item.images.length > 0 ? item.images[0] : '/fallback-image.jpg'
                return (
                  <div key={`${item.id}-${item.size}`} className="flex items-center border-b pb-4">
                    <Image src={imageUrl} alt={item.name} width={100} height={100} className="rounded-md mr-4" />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">Rs. {item.price.toFixed()} / day</p>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div>
                        <label htmlFor={`quantity-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Quantity
                        </label>
                        <div className="flex items-center">
                          <Button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded-l"
                          >
                            -
                          </Button>
                          <Input
                            id={`quantity-${item.id}`}
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="w-16 text-center border-y border-gray-200"
                          />
                          <Button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label htmlFor={`duration-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Days
                        </label>
                        <Input
                          id={`duration-${item.id}`}
                          type="number"
                          min="1"
                          value={item.rentalDuration}
                          onChange={(e) => updateRentalDuration(item.id, parseInt(e.target.value))}
                          className="w-16 text-center"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => removeFromCart(item.id)}
                      variant="destructive"
                      className="ml-4"
                    >
                      Remove
                    </Button>
                  </div>
                )
              })}
            </div>
            <div className="mb-8">
              <p className="text-lg mb-2">Subtotal: Rs. {subtotal.toFixed()}</p>
              <p className="text-lg mb-2">Tax (10%): Rs. {tax.toFixed()}</p>
              <p className="text-xl font-bold">Total: Rs. {total.toFixed()}</p>
            </div>
            <div className="flex justify-between">
              <Button onClick={clearCart} variant="outline">Clear Cart</Button>
              <Button onClick={handleCheckout} className="bg-primary hover:bg-primary/90">Proceed to Checkout</Button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
