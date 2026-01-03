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
import { Play, Trash2 } from "lucide-react";

const ProductCardNew = ({ product, onDashboard }: { product: Product; onDashboard: boolean }) => {
  const { user } = useUser();
  const userId = user?.id;

  const [showCheckout, setShowCheckout] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  const utils = trpc.useUtils();

  const { data } = trpc.getMediaById.useQuery({ id: product.mediaId }) ?? "";
  const getUsernameById = trpc.getUsernameById.useQuery({ id: product.authorId });
  const deleteFile = trpc.deleteProduct.useMutation();
  const mediaUrl = data?.[0]?.url;
  const isVideo = data?.[0]?.type === "video";
  const price = (product.priceCents / 100).toFixed(2);
  return (
    <>
      <Card className="flex flex-col h-full overflow-hidden group hover:shadow-lg transition-shadow">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {isVideo ? (
            <div>
              <Image
                className="w-28 h-28 absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                onClick={() => setOpen(true)}
                src={"/play.svg"}
                alt="play button"
                width={28}
                height={28}
              ></Image>
              <video
                src={mediaUrl || "/placeholder.svg"}
                preload="metadata"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                onClick={() => setOpen(true)}
              ></video>
            </div>
          ) : (
            <Image
              src={mediaUrl || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}

          <div>
            {product.newRelease && (
              <div className="absolute top-2 left-2 rounded-xl p-1 bg-red-500 text-white text-sm font-bold">
                NEW RELEASE
              </div>
            )}
            {onDashboard && (
              <div
                className="absolute top-2 left-2 rounded-xl p-1 bg-red-400 text-white hover:bg-red-500 transition z-50 p-4"
                onClick={async () => {
                  console.log("CLiked");
                  deleteFile.mutate({ id: product.id });
                  await utils.readUserProducts.invalidate();
                }}
              >
                <Trash2 className="w-6 h-6"></Trash2>
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
                    $
                    {(
                      Math.round(Number(price) * 100 * (1 - Number(product.discount))) / 100
                    ).toFixed(2)}{" "}
                  </p>
                  <div className="rounded-xl p-1 bg-red-500 text-xl text-white flex justify-center items-center font-bold">
                    {Math.round(Number(product.discount) * 100)}% OFF
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          {isVideo ? (
            <Button className="w-full" size="lg" onClick={() => setOpen(true)}>
              Watch Preview
            </Button>
          ) : (
            <Button className="w-full" size="lg" onClick={() => setShowCheckout(true)}>
              Buy Now
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Dialogs */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
          </DialogHeader>
          <Checkout productId={product.id} />
        </DialogContent>
      </Dialog>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[90vw] h-[min(90vh,768px)] max-w-[90vw] max-h-[75vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Video Preview</DialogTitle>
          </DialogHeader>
          <div className="flex-1 flex items-center justify-center">
            <video src={mediaUrl} controls className="w-full h-full rounded-lg bg-black" autoPlay />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCardNew;
