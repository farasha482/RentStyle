import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductList from "@/components/product-list";
import { Suspense } from 'react'

export default function ProductsPage({ searchParams }: { searchParams: { query?: string } }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList query={searchParams.query} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
