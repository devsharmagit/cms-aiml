"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { uploadDocument } from "@/lib/actions/file";

const formSchema = z.object({
  documentName: z.string().min(2).max(50),
  file: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are accepted",
    }),
    categoryId: z.string().min(2).max(50),
});

const AddDocument = ({ categoryId }: { categoryId: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentName: "",
      file: undefined,
      categoryId: categoryId
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData
    formData.append("documentName", values.documentName)
    formData.append("categoryId", values.categoryId)
    formData.append("file", values.file)
    uploadDocument(formData)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-2 flex-col items-center justify-center h-auto m-auto mt-5"
        >
          <Upload height={35} width={35} />
          <p className="text-base text-opacity-70">Add Document</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Document</DialogTitle>
          <DialogDescription>
            Would you like to add a document in this category?
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="documentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Document name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>PDF file</FormLabel>
              <FormControl>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    form.setValue("file", file as File);
                  }}
                />
              </FormControl>
              {form.formState.errors.file && (
                <p className="text-red-500">
                  {form.formState.errors.file.message}
                </p>
              )}
            </FormItem>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDocument;
