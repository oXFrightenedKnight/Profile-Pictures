"use client";
import { trpc } from "@/app/_trpc/client";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import { ProductCard } from "@/components/product-card";
import ProductCardNew from "@/components/UpgProductCard";
import { Loader2 } from "lucide-react";

const communityProducts = () => {
  const params = useParams();
  const id = params.id;

  const { data, hasNextPage, fetchNextPage } = trpc.readProducts.useInfiniteQuery(
    { limit: 10, collectionId: id as string },
    { getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined }
  );
  const products = data?.pages.flatMap((p) => p.products) ?? [];

  console.log(products);

  const [root, setRoot] = useState<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root,
    threshold: 1,
    rootMargin: "0px",
  });
  useEffect(() => {
    setRoot(containerRef.current);
  }, []);

  useEffect(() => {
    if (!entry?.isIntersecting) return;
    if (!hasNextPage) return;

    fetchNextPage();
  }, [entry]);
  return (
    <>
      <main ref={containerRef} className="container mx-auto px-4 py-12 mt-[9vh]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length !== 0
            ? products.map((product) => <ProductCardNew key={product.id} product={product} />)
            : null}
        </div>
      </main>
      {hasNextPage && (
        <div ref={ref} className="w-full flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin"></Loader2>
        </div>
      )}
    </>
  );
};
export default communityProducts;
