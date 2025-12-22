"use client";

import z from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormMessage, Form } from "./ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Pencil, TriangleAlert } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { trpc } from "@/app/_trpc/client";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "No name🥺?" })
    .max(50, { message: "Blud your over the limit. 50 chars max" }),
  description: z
    .string()
    .min(1, { message: "At least say you're unemployed" })
    .max(200, { message: "You know what else is massive? Your description. 200 chars max." }),
});

const EditDialog = ({ name, description }: { name: string; description: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  const utils = trpc.useUtils();

  const editedProfile = trpc.updateUserProfile.useMutation({
    onSuccess: (editedUser) => {
      utils.readMyProfile.invalidate();
    },
    retry: true,
    retryDelay: 1000,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!name && !description) return;

    form.reset({
      name: name,
      description: description,
    });
  }, [name, description, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setOpen(false);
    editedProfile.mutate({ name: values.name, description: values.description });
  }
  return (
    <>
      <Button
        variant={"ghost"}
        className="p-2 absolute right-2 top-2 rounded-[10px] hover:bg-neutral-300"
        onClick={() => setOpen(true)}
      >
        <Pencil className="w-6 h-6 text-neutral-500"></Pencil>
      </Button>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          form.reset();
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader className="mb-4">
                <DialogTitle>Edit yourself</DialogTitle>
                <DialogDescription>At least be cool here</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3 min-h-[15vh] bg-amber-700 rounded-2xl border-2 border-amber-300">
                  <div className="flex p-2 items-center justify-start text-amber-300">
                    <TriangleAlert className="w-8 h-8 text-amber-300 shrink-0 mr-2"></TriangleAlert>
                    To change your profile picture, tap on your profile picture in the top right
                    corner and choose "Manage Account".
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <div className="grid gap-2">
                      <Label htmlFor="product-name">Name</Label>
                      <Input id="product-name" placeholder="Alpha Gigachad VI" {...field}></Input>
                      <FormMessage className="text-xs"></FormMessage>
                    </div>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <div className="grid gap-2">
                      <Label htmlFor="product-name">Description</Label>
                      <Input
                        id="product-name"
                        placeholder="I am a 16 year old unemplyed dude who likes..."
                        {...field}
                      ></Input>
                      <FormMessage className="text-xs"></FormMessage>
                    </div>
                  )}
                ></FormField>
              </div>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant={"outline"}>Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default EditDialog;
