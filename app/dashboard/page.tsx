"use client";

import { Product, trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import ProductCardNew from "@/components/UpgProductCard";
import { useUser } from "@clerk/clerk-react";
import { useIntersection } from "@mantine/hooks";
import {
  CirclePlus,
  DatabaseZap,
  DiamondPlus,
  DoorOpen,
  FilePlay,
  ImagePlus,
  Loader2,
  Store,
} from "lucide-react";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import EditDialog from "@/components/EditDialog";
import UploadForm from "@/components/UploadForm";

const Page = () => {
  const { user, isLoaded } = useUser();
  const clerkId = user?.id;

  const { data } = trpc.readMyProfile.useQuery(undefined, {
    enabled: isLoaded && !!clerkId,
  });
  const myUser = data?.myUser[0];
  const avatarUrl = data?.avatarUrl;

  const myProducts = trpc.readUserProducts.useInfiniteQuery(
    { limit: 10, userId: myUser?.id || "" },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      enabled: !!myUser?.id,
    }
  );
  const allProducts = myProducts.data?.pages.flatMap((p) => p.products) ?? [];
  const storageTaken = myUser?.storageTaken ?? 0;

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isVideo, setIsVideo] = useState<boolean>(false);
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
    if (!myProducts.hasNextPage) return;

    myProducts.fetchNextPage();
  }, [entry]);

  if (!isLoaded) {
    return null;
  }
  if (!clerkId || !user) {
    redirect("/auth-callback?origin=dashboard");
  }
  return (
    <div className="flex w-full min-h-[91vh] mt-[66px]">
      <div className="w-[260px] min-h-full border bg-neutral-400 hidden lg:flex p-6 pt-4 fixed z-10">
        <div className="w-full h-full flex flex-col gap-2">
          <div className="w-24 h-9 bg-white border border-neutral-800 rounded-[10px] flex justify-center items-center">
            <span className="font-semibold">
              {Math.round((256_000_000 - storageTaken) / 1_000_000)}
            </span>
            <span className="font-bold pr-1">MB</span>
            <div className="h-full w-[30%] flex justify-center items-center p-1 border-l border-neutral-800">
              <DatabaseZap className="w-4 h-4"></DatabaseZap>
            </div>
          </div>
          <Button
            className="cursor-pointer font-semibold text-3xs w-full p-4"
            onClick={() => {
              setDialogOpen(true);
              setIsVideo(false);
            }}
          >
            <ImagePlus className="w-8 h-8 text-white"></ImagePlus>New Image Product
          </Button>
          <Button
            className="cursor-pointer font-semibold text-3xs w-full p-4"
            onClick={() => {
              setDialogOpen(true);
              setIsVideo(true);
              console.log("isVideo", isVideo);
            }}
          >
            <FilePlay className="w-8 h-8 text-white"></FilePlay>New Video Product
          </Button>
          <UploadForm
            setDialogOpen={setDialogOpen}
            dialogOpen={dialogOpen}
            isVideo={isVideo}
            userId={myUser?.id ?? ""}
          ></UploadForm>
        </div>
      </div>
      <div>
        <Button
          className="fixed mt-[72px] size-12 top-3 left-3 z-2 md:hidden bg-black text-white rounded-full"
          onClick={() => setOpen(true)}
        >
          <DiamondPlus className="w-12 h-12 shrink-0"></DiamondPlus>
        </Button>
        <div
          onClick={() => {
            setOpen(false);
          }}
          className={`fixed inset-0 bg-black/40 transition-opacity z-1 ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        />
        <div className="absolute top-20 left-0 w-full px-4 flex flex-col items-start gap-3">
          <div
            className={`fixed inset-y-0 left-0 z-101 w-[60vw] bg-neutral-400 rounded-t-2xl transform transition-transform duration-300 ease-out ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="w-full px-4 pt-[88px] flex flex-col items-start gap-3">
              <div className="w-24 h-9 bg-white border border-neutral-800 rounded-[10px] flex justify-center items-center">
                <span className="font-semibold">
                  {Math.round((256_000_000 - storageTaken) / 1_000_000)}
                </span>
                <span className="font-bold pr-1">MB</span>
                <div className="h-full w-[30%] flex justify-center items-center p-1 border-l border-neutral-800">
                  <DatabaseZap className="w-4 h-4"></DatabaseZap>
                </div>
              </div>
              <Button
                className="cursor-pointer font-semibold text-3xs w-full p-4"
                onClick={() => {
                  setDialogOpen(true);
                  setIsVideo(false);
                }}
              >
                <ImagePlus className="w-8 h-8 text-white"></ImagePlus>New Image Product
              </Button>
              <Button
                className="cursor-pointer font-semibold text-3xs w-full p-4"
                onClick={() => {
                  setDialogOpen(true);
                  setIsVideo(true);
                  console.log("isVideo", isVideo);
                }}
              >
                <FilePlay className="w-8 h-8 text-white"></FilePlay>New Video Product
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[80%] min-h-full lg:ml-[260px]">
        <div className="flex w-full justify-center items-center font-bold text-4xl mb-6 mt-6">
          My Brand
        </div>
        <div className="flex w-full h-screen flex-col pt-6">
          <div className="md:min-h-[300px] border-b">
            <div className="flex h-[70%] md:min-h-[210px] w-full justify-center items-center gap-6 flex-col md:flex-row">
              <div className="p-6 flex flex-col gap-3 justify-between items-center w-full sm:min-w-[280px] md:min-w-[320px] md:max-w-[320px] max-w-sm h-full bg-neutral-200 rounded-xl relative">
                <EditDialog
                  name={myUser?.name || ""}
                  description={myUser?.description || ""}
                ></EditDialog>

                {avatarUrl && (
                  <Image
                    src={avatarUrl}
                    alt="avatar"
                    width={108}
                    height={108}
                    className="rounded-full w-[108px] h-[108px] border border-neutral-300"
                  />
                )}
                <div className="font-bold text-[14px]">@{myUser?.name}</div>
              </div>
              <div className="w-full min-w-[280px] max-w-sm md:w-xl md:max-w-xl h-full min-h-30 p-6 rounded-2xl bg-neutral-200">
                {myUser?.description}
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
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {allProducts.length !== 0
                  ? allProducts.map((product) => (
                      <ProductCardNew key={product.id} product={product} onDashboard={true} />
                    ))
                  : null}
              </div>
            </main>
            <div ref={ref} className="w-full flex justify-center items-center">
              {myProducts.hasNextPage ? (
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
      </div>
    </div>
  );
};
export default Page;
