"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/lib/cart-context";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  sizes: string[]; // Available sizes
  size?: string; // Optional for cart items
  rentalDuration?: number;
}

export default function ProductList({ query }: { query?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `/api/products${query ? `?query=${encodeURIComponent(query)}` : ""}`
        );
        if (!response.ok) {
          console.error("Error fetching products:", await response.text());
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("Fetched Products:", data);

        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error fetching products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  const handleAddToCart = (product: Product) => {
    const productToAdd = {
      ...product,
      size: product.size || "M", // Default size (or let users choose before adding to cart)
      rentalDuration: product.rentalDuration || 3, // Default rental duration
    };

    addToCart(productToAdd);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => {
        const imageUrl =
          product.images && product.images.length > 0
            ? product.images[0]
            : (product?.image);
        console.log(imageUrl);
        return (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Link href={`/products/${product.id}`}>
              <div 
              className="h- w-18"
              >
                
                <Image
                src={imageUrl}
                alt={product.name}
                width={300}
                height={300}
                className="object-cover"
              /></div>
            </Link>
            <div className="p-4">
              <Link href={`/products/${product.id}`}>
                <h3 className="text-lg font-semibold mb-2 hover:text-primary">
                  {product.name}
                </h3>
              </Link>
              <p className="text-gray-600 mb-2">
                Rs {product.price.toFixed()} / day
              </p>
              <p className="text-sm text-gray-500 mb-4">{product.category}</p>
              <Button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
