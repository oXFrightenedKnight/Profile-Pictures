import { PRODUCTS } from "@/lib/products"
import { ProductCard } from "@/components/product-card"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold mb-4 text-balance">Premium Profile Pictures</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Stand out online with unique, high-quality PFPs. Instant download after purchase.
          </p>
        </div>
      </header>

      {/* Product Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2025 PFP Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
