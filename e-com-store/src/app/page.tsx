import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Header from '@/components/header'
import Footer from '@/components/footer'
import FeaturedItems from '@/components/featured-items'
import {options} from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
//import UserCard  from "./components/UserCard"


export default async function Home() {
  const session = await getServerSession(options) 
  return (
    <>
    
   
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-primary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6 text-primary">Rent the Best Outfits</h1>
              <p className="text-xl mb-8 text-gray-700">Look stunning for any occasion without breaking the bank.</p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/products">Browse Outfits</Link>
              </Button>
            </div>
          </div>
        </section>
        <FeaturedItems />
      </main>
      <Footer />
    </div>
    </>
  )



}

