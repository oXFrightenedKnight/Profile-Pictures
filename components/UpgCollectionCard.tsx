"use client";

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
import Link from "next/link";
import { Collection } from "@/app/_trpc/client";

export function UpgCollectionCard({ collection }: { collection: Collection }) {
  return (
    <>
      <Link href={`/collections/${collection.id}`}>
        <Card className="flex flex-col h-full overflow-hidden group hover:shadow-lg transition-shadow">
          <div className="relative aspect-square overflow-hidden bg-muted relative">
            <Image
              src={"/community.png"}
              alt={collection.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div></div>
          </div>
          <CardHeader className="h-32">
            <CardTitle className="text-xl">{collection.name}</CardTitle>
            <CardDescription className="line-clamp-2 h-12">
              {collection.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="h-20 flex flex-col justify-end">
              <p className="text-3xl font-bold pt-9">Explore Now</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full cursor-pointer" size="lg">
              Shop Offers
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
}
