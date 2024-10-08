"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Loader, Upload } from "lucide-react";
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

const [isOpen,setIsOpen] = useState<boolean>(false)
const [isLoading,setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentName: "",
      file: undefined,
      categoryId: categoryId
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      const formData = new FormData
      formData.append("documentName", values.documentName)
      formData.append("categoryId", values.categoryId)
      formData.append("file", values.file)
      const result = await uploadDocument(formData)
      if(result){
        setIsOpen(false)
      }  
    } catch (error) {
      console.log(error)
      setIsOpen(false)
    }finally{
      setIsLoading(false)
    }
    
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-2  items-center justify-center h-auto "
        >
          <Upload height={20} width={20} />
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

            <Button type="submit">
              {isLoading ?  <Loader />:
              "Submit"
              }
              </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDocument;
