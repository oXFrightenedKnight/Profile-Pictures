"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import UploadButton from "@/components/UploadButton";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { trpc, Product } from "@/app/_trpc/client";
import Image from "next/image";
import { Timer, TriangleAlert } from "lucide-react";

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

const UploadForm = ({
  setDialogOpen,
  dialogOpen,
  userId,
  isVideo,
}: {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  isVideo: boolean;
}) => {
  const [media, setMedia] = useState<{
    id: string;
    url: string;
    size: number;
  } | null>(null);
  const [submittedAndNoImg, setSubmittedAndNoImg] = useState<boolean>(false);

  const deleteMediaOnCancel = trpc.deleteMedia.useMutation();
  const createProduct = trpc.createProduct.useMutation({
    onSuccess: (product) => {
      mergeProducts(product);
    },
    retry: true,
    retryDelay: 1000,
  });

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
    if (!media) return;
    setSubmittedAndNoImg(false);
    setDialogOpen(false);
    console.log(values);
    createProduct.mutate({
      name: values.name,
      description: values.description,
      priceInCents: Math.round(Number(values.price) * 100),
      discount: values.discount / 100,
      copies: values.copies,
      mediaId: media?.id,
    });
    setMedia(null);
  }

  const utils = trpc.useUtils();
  const mergeProducts = (incomingProduct: Product) => {
    utils.readUserProducts.setInfiniteData({ limit: 10, userId: userId || "" }, (old) => {
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
  return (
    <>
      <Dialog
        open={dialogOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen && media) {
            deleteMediaOnCancel.mutate({ id: media?.id });
            setMedia(null);
          }
          form.reset();
          setDialogOpen(isOpen);
        }}
      >
        <DialogContent className="sm:max-w-[425px] z-250">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader className="mb-4">
                <DialogTitle>Create Product</DialogTitle>
                <DialogDescription>Make sure its sigma.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  {media && !isVideo ? (
                    <div>
                      <Image
                        src={media.url}
                        alt="uploaded image"
                        className="w-[72px] h-[72px]"
                        width={72}
                        height={72}
                      ></Image>
                      <div className="text-xs font-semibold pt-2">
                        {(media.size / 1_000_000).toFixed(2)}MB will be deducted from your storage
                      </div>
                    </div>
                  ) : media && isVideo ? (
                    <div>
                      <video
                        className="w-[72px] h-[72px] bg-black"
                        width={72}
                        height={72}
                        src={media.url}
                        preload="metadata"
                      ></video>
                      <div className="text-xs font-semibold pt-2">
                        {(media.size / 1_000_000).toFixed(2)}MB will be deducted from your storage
                      </div>
                    </div>
                  ) : (
                    <UploadButton onUploaded={setMedia} isVideo={isVideo}></UploadButton>
                  )}
                  {isVideo && !media && (
                    <>
                      <div className="grid gap-3 bg-amber-700 rounded-2xl border-2 border-amber-300">
                        <div className="flex p-2 items-center justify-start text-amber-300">
                          <TriangleAlert className="w-8 h-8 text-amber-300 shrink-0 mr-2"></TriangleAlert>
                          After submitting, the video may take up to 10-15 minutes to process.
                        </div>
                      </div>
                      <div className="grid gap-3 bg-cyan-600 rounded-2xl border-2 border-cyan-300">
                        <div className="flex p-2 items-center justify-start text-cyan-300">
                          <Timer className="w-8 h-8 text-cyan-300 shrink-0 mr-2"></Timer>
                          All video products are automatically deleted after 7 days
                        </div>
                      </div>
                    </>
                  )}
                  {submittedAndNoImg && !media ? (
                    <div className="text-xs text-red-500">
                      Please upload {isVideo ? <div>a video</div> : <div>an image</div>}
                    </div>
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
                      <Input id="description" {...field} placeholder="My worst product yet"></Input>
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
    </>
  );
};

export default UploadForm;
