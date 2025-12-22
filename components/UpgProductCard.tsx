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
import Checkout from "./checkout";
import { Product, trpc } from "@/app/_trpc/client";
import Link from "next/link";
import { useUser } from "@clerk/clerk-react";

const ProductCardNew = ({ product }: { product: Product }) => {
  const { user } = useUser();
  const userId = user?.id;
  const [showCheckout, setShowCheckout] = useState(false);
  const { data } = trpc.getImgById.useQuery(
    { id: product.imageId },
    { select: (data) => data[0]?.url ?? null }
  );
  const getUsernameById = trpc.getUsernameById.useQuery({ id: product.authorId });
  const imgUrl = data;
  const price = (product.priceCents / 100).toFixed(2);
  return (
    <>
      <Card className="flex flex-col h-full overflow-hidden group hover:shadow-lg transition-shadow">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={imgUrl || "/placeholder.svg"}
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
        <CardHeader>
          <CardTitle className="text-xl truncate">{product.name}</CardTitle>
          <CardDescription className="line-clamp-2 h-11 wrap-break-word">
            {product.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div>
            By:{" "}
            <span className="underline text-blue-500 truncate">
              <Link href={`/${product.authorId}`}>{getUsernameById.data?.name}</Link>
            </span>
          </div>

          <div className="h-20 flex flex-col justify-end">
            {product.discount === null || Number(product.discount) === 0 ? (
              <p className="text-3xl font-bold pt-9">${price}</p>
            ) : (
              <div className="flex flex-col">
                <p className="text-2xl font-bold line-through text-neutral-700">${price}</p>
                <div className="flex gap-2">
                  <p className="text-3xl font-bold">
                    ${(Number(price) * (1 - Number(product.discount))).toFixed(2)}{" "}
                  </p>
                  <div className="rounded-xl p-1 bg-red-500 text-xl text-white flex justify-center items-center font-bold">
                    {Number(product.discount) * 100}% OFF
                  </div>
                </div>
              </div>
            )}
          </div>
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
  );
};

export default ProductCardNew;
