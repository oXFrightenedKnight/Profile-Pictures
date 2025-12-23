"use client";

import { Product, trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProductCardNew from "@/components/UpgProductCard";
import { useUser } from "@clerk/clerk-react";
import { useIntersection } from "@mantine/hooks";
import { CirclePlus, DiamondPlus, DoorOpen, Loader2, Store } from "lucide-react";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import UploadButton from "@/components/UploadButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormMessage } from "@/components/ui/form";
import EditDialog from "@/components/EditDialog";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Dementia can't be hitting you that bad. Where is the name?" })
    .max(50, { message: "Blud your over the limit. 50 chars max" }),
  description: z
    .string()
    .min(1, { message: "How will others know what your product is about?" })
    .max(100, { message: "You know what else is massive? Your description. 100 chars max." }),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Price must have up to 2 decimal places",
    })
    .refine((v) => Number(v) >= 0.01, {
      message: "This aint charity dude. At least make it a cent",
    })
    // 3️⃣ максимум 9999.99
    .refine((v) => Number(v) <= 9999.99, {
      message: "Aint no one is gonna buy that. Keep price under 10k",
    }),
  discount: z.coerce
    .number()
    .min(0, { message: "Blud is not doing negative discounts🙏" })
    .max(100, { message: "Do you want to pay people when they buy your stuff or smth?" }),
  copies: z.coerce
    .number()
    .int({ message: "You can't sell fraction of a copy" })
    .min(1, { message: "Bro you have to sell SOMETHING" })
    .max(999, { message: "You can't pay your bills with that many copies" }),
});

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

  const deleteImageOnCancel = trpc.deleteImage.useMutation();
  const createProduct = trpc.createProduct.useMutation({
    onSuccess: (product) => {
      mergeProducts(product);
    },
    retry: true,
    retryDelay: 1000,
  });

  const utils = trpc.useUtils();
  const mergeProducts = (incomingProduct: Product) => {
    utils.readUserProducts.setInfiniteData({ limit: 10, userId: myUser?.id || "" }, (old) => {
      console.log(old);
      if (!old) return old;
      if (!incomingProduct) return old;

      const pages = [...old.pages];

      if (pages.length === 0) return old;

      const firstPage = pages[0];

      const updatedFirstPage = {
        ...firstPage,
        products: [incomingProduct, ...firstPage.products],
      };

      pages[0] = updatedFirstPage;
      return {
        ...old,
        pages,
      };
    });
  };

  const [image, setImage] = useState<{
    id: string;
    url: string;
  } | null>(null);
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

  const [open, setOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [submittedAndNoImg, setSubmittedAndNoImg] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "10",
      discount: 0,
      copies: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!image) return;
    setSubmittedAndNoImg(false);
    setDialogOpen(false);
    console.log(values);
    createProduct.mutate({
      name: values.name,
      description: values.description,
      priceInCents: Math.round(Number(values.price) * 100),
      discount: values.discount / 100,
      copies: values.copies,
      imageId: image?.id,
    });
    setImage(null);
  }
  if (!isLoaded) {
    return null;
  }
  if (!clerkId || !user) {
    redirect("/auth-callback?origin=dashboard");
  }
  return (
    <div className="flex w-full min-h-[91vh] mt-[9vh]">
      <div className="w-[260px] min-h-full border bg-neutral-400 hidden lg:flex p-6 pt-4 fixed z-10">
        <div className="w-full h-full">
          <Dialog
            open={dialogOpen}
            onOpenChange={(isOpen) => {
              if (!isOpen && image) {
                deleteImageOnCancel.mutate({ id: image?.id });
                setImage(null);
              }
              form.reset();
              setDialogOpen(isOpen);
            }}
          >
            <DialogTrigger asChild>
              <Button className="cursor-pointer font-semibold text-3xs w-full p-4">
                <CirclePlus className="w-8 h-8 text-white"></CirclePlus>Create New
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <DialogHeader className="mb-4">
                    <DialogTitle>Create Product</DialogTitle>
                    <DialogDescription>Make sure its sigma.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      {image ? (
                        <Image
                          src={image.url}
                          alt="uploaded image"
                          className="w-[72px] h-[72px]"
                          width={72}
                          height={72}
                        ></Image>
                      ) : (
                        <UploadButton onUploaded={setImage}></UploadButton>
                      )}
                      {submittedAndNoImg && !image ? (
                        <div className="text-xs text-red-500">Please upload an image</div>
                      ) : null}
                    </div>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <div className="grid gap-2">
                          <Label htmlFor="product-name">Name</Label>
                          <Input id="product-name" placeholder="67 Kid" {...field}></Input>
                          <FormMessage className="text-xs"></FormMessage>
                        </div>
                      )}
                    ></FormField>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <div className="grid gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Input
                            id="description"
                            {...field}
                            placeholder="My worst product yet"
                          ></Input>
                          <FormMessage className="text-xs"></FormMessage>
                        </div>
                      )}
                    ></FormField>
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <div className="grid gap-2">
                          <Label htmlFor="price">Price ($)</Label>
                          <Input id="price" type="number" {...field} placeholder="67.67"></Input>
                          <FormMessage className="text-xs"></FormMessage>
                        </div>
                      )}
                    ></FormField>
                    <FormField
                      control={form.control}
                      name="discount"
                      render={({ field }) => (
                        <div className="grid gap-2">
                          <Label htmlFor="discount">Discount (%)</Label>
                          <Input id="discount" type="number" {...field}></Input>
                          <FormMessage className="text-xs"></FormMessage>
                        </div>
                      )}
                    ></FormField>
                    <FormField
                      control={form.control}
                      name="copies"
                      render={({ field }) => (
                        <div className="grid gap-2">
                          <Label htmlFor="copies">Copies</Label>
                          <Input id="copies" type="number" {...field}></Input>
                          <FormMessage className="text-xs"></FormMessage>
                        </div>
                      )}
                    ></FormField>
                  </div>
                  <DialogFooter className="mt-4">
                    <DialogClose asChild>
                      <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={() => setSubmittedAndNoImg(true)}>
                      Save changes
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <Button
          className="fixed mt-[10vh] size-12 top-3 left-3 z-2 md:hidden bg-black text-white rounded-full"
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
        <div
          className={`fixed inset-y-0 left-0 z-2 pt-[10vh] w-[60vw] bg-neutral-400 rounded-t-2xl transform transition-transform duration-300 ease-out  ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="w-full h-full pl-4 pr-4 pt-2">
            <Button
              className="cursor-pointer font-semibold text-3xs w-full p-4"
              onClick={() => {
                setDialogOpen(true);
                setOpen(false);
              }}
            >
              <CirclePlus className="w-8 h-8 text-white"></CirclePlus>Create New
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[80%] min-h-full lg:ml-[260px]">
        <div className="flex w-full justify-center items-center font-bold text-4xl mb-6 mt-6">
          My Brand
        </div>
        <div className="flex w-full h-screen flex-col pt-6">
          <div className="md:min-h-[40%] border-b">
            <div className="flex h-[70%] w-full justify-center items-center gap-6 flex-col md:flex-row">
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
                      <ProductCardNew key={product.id} product={product} />
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
