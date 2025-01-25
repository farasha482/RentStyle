"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react'


export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter()


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    //console.log("Searching for:", searchQuery);
    router.push(`/products?query=${encodeURIComponent(searchQuery)}`)

  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          RentStyle
        </Link>
        <form onSubmit={handleSearch} className="flex-grow max-w-md mx-4">
          <div className="flex">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Button type="submit" className="ml-2 bg-primary hover:bg-primary/90">
              Search
            </Button>
          </div>
        </form>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link href="/signup" className="hover:underline">
                Sign Up
              </Link>
            </li>
            <li>
            <Link href="/cart" className="hover:text-primary">
            <ShoppingCart className="h-6 w-6" />
          </Link>
          </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
