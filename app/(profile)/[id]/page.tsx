"use client";

import { trpc } from "@/app/_trpc/client";
import ProductCardNew from "@/components/UpgProductCard";
import { useIntersection } from "@mantine/hooks";
import { DoorOpen, Loader2, Store } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { notFound } from "next/navigation";

const Profile = () => {
  const params = useParams();
  const profileId = params.id as string;

  const userProfile = trpc.readUserProfile.useQuery({ userId: profileId }, { retry: false });

  const products = trpc.readUserProducts.useInfiniteQuery(
    { limit: 10, userId: profileId },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      enabled: !!profileId && !!userProfile.data?.user,
    }
  );
  const allProducts = products.data?.pages.flatMap((p) => p.products) ?? [];

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
    if (!products.hasNextPage) return;

    products.fetchNextPage();
  }, [entry]);

  if (userProfile.isLoading) {
    return null; // или skeleton
  }

  if (!userProfile.data?.user) {
    notFound();
  }

  const user = userProfile.data?.user;
  const avatarUrl = userProfile.data?.avatarUrl as string;
  return (
    <>
      <div className="flex w-full h-screen flex-col pt-6 mt-26 md:mt-16">
        <div className="md:min-h-[40%] border-b">
          <div className="flex h-[70%] w-full justify-center items-center gap-6 flex-col md:flex-row">
            <div className="p-6 flex flex-col gap-3 justify-between items-center w-full sm:min-w-[280px] md:min-w-[320px] md:max-w-[320px] max-w-sm h-full bg-neutral-200 rounded-xl relative">
              {avatarUrl && (
                <Image
                  src={avatarUrl}
                  alt="avatar"
                  width={108}
                  height={108}
                  className="rounded-full w-[108px] h-[108px] border border-neutral-300"
                />
              )}
              <div className="font-bold text-[14px]">@{user.name}</div>
            </div>
            <div className="w-full min-w-[280px] max-w-sm md:w-xl md:max-w-xl h-full min-h-30 p-6 rounded-2xl bg-neutral-200">
              {user.description}
            </div>
          </div>
          <div className="h-[30%] border-b-neutral-200">
            <div className="w-full h-full flex justify-center items-end">
              <div className="hover:bg-neutral-100 rounded-2xl cursor-pointer p-2">
                <div className="border-b-2 border-b-blue-400 flex gap-1 items-center">
                  <Store className="w-6 h-6 text-blue-400"></Store>
                  <span className="font-bold text-2xl text-blue-400">Products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div ref={containerRef} className="flex-6">
          <main className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProducts.length !== 0
                ? allProducts.map((product) => (
                    <ProductCardNew key={product.id} product={product} />
                  ))
                : null}
            </div>
          </main>
          <div ref={ref} className="w-full flex justify-center items-center">
            {products.hasNextPage ? (
              <Loader2 className="w-8 h-8 animate-spin"></Loader2>
            ) : allProducts.length === 0 ? (
              <div className="flex flex-col justify-center items-center gap-6">
                <div className="text-neutral-400 text-2xl">Seems pretty empty in here</div>
                <DoorOpen className="w-12 h-12 text-neutral-400"></DoorOpen>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
