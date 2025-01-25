import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function ThankYouPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-primary">Thank You for Your Order!</h1>
        <p className="mb-8">Your order has been received and is being processed. You will receive a confirmation email shortly.</p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </main>
      <Footer />
    </div>
  )
}

