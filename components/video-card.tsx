"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Product } from "@/lib/products";
import Checkout from "./checkout";

interface ProductCardProps {
  product: Product;
}

export function ProductCardVideo({ product }: ProductCardProps) {
  const [open, setOpen] = useState(false);

  const formattedPrice = (
    product.discount === null
      ? product.priceInCents / 100
      : (product.priceInCents - product.priceInCents * product.discount) / 100
  ).toFixed(2);

  return (
    <>
      <Card className="flex flex-col h-full overflow-hidden group hover:shadow-lg transition-shadow">
        {/* IMAGE PREVIEW */}
        <div className="relative aspect-square overflow-hidden bg-muted relative">
          <Image
            src={product.images?.[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <div>
            {product.newRelease && (
              <div className="absolute top-2 left-2 rounded-xl p-1 bg-red-500 text-white text-sm font-bold">
                NEW RELEASE
              </div>
            )}

            {product.copies !== null && (
              <div className="absolute top-2 right-2 rounded-xl p-1 bg-red-500 text-white text-sm font-bold">
                Only {product.copies} left!
              </div>
            )}
          </div>
        </div>

        {/* TEXT CONTENT */}
        <CardHeader>
          <CardTitle className="text-xl">{product.name}</CardTitle>
          <CardDescription className="line-clamp-2 h-12">{product.description}</CardDescription>
        </CardHeader>

        {/* PRICE */}
        <CardContent className="flex-1">
          <div className="h-20 flex flex-col justify-end">
            {product.discount === null ? (
              <p className="text-3xl font-bold pt-9">${formattedPrice}</p>
            ) : (
              <div className="flex flex-col">
                <p className="text-2xl font-bold line-through text-neutral-700">
                  ${product.priceInCents / 100}
                </p>
                <div className="flex gap-2">
                  <p className="text-3xl font-bold">${formattedPrice}</p>
                  <div className="rounded-xl p-1 bg-red-500 text-xl text-white flex justify-center items-center font-bold">
                    {product.discount * 100}% OFF
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        {/* BUTTON */}
        <CardFooter>
          <Button className="w-full" size="lg" onClick={() => setOpen(true)}>
            {product.type === "video" ? "Watch Preview" : "Buy Now"}
          </Button>
        </CardFooter>
      </Card>

      {/* DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {product.type === "video" ? "Video Preview" : "Complete Your Purchase"}
            </DialogTitle>
          </DialogHeader>

          {product.type === "video" ? (
            <div className="w-full">
              <video src={product.videoUrl!} controls className="w-full rounded-lg" autoPlay />
            </div>
          ) : (
            <Checkout productId={product.id} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
