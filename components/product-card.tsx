"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Product } from "@/lib/products"
import Checkout from "./checkout"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [showCheckout, setShowCheckout] = useState(false)

  const formattedPrice = (product.priceInCents / 100).toFixed(2)

  return (
    <>
      <Card className="flex flex-col h-full overflow-hidden group hover:shadow-lg transition-shadow">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.images?.[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl">{product.name}</CardTitle>
          <CardDescription className="line-clamp-2">{product.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-3xl font-bold">${formattedPrice}</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg" onClick={() => setShowCheckout(true)}>
            Buy Now
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
          </DialogHeader>
          <Checkout productId={product.id} />
        </DialogContent>
      </Dialog>
    </>
  )
}
