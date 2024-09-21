"use server";
import { revalidatePath } from "next/cache";
import cloudinary from "cloudinary";
import prisma from "../db";
import { getServerSession } from "next-auth"; 
import { options } from "@/app/api/auth/[...nextauth]/route";


cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECERET,
  });

export async function uploadDocument(formData: FormData) {

    const session = getServerSession(options)
  const file = formData.get("file") as File;
  const result = await cloudinary.v2.uploader.upload(file, {folder: "cms"})

  const prismaResult = await prisma.document.create({data: {
    url: result.secure_url,
    publicId: result.public_id,
    name: formData.get("documentName") as string,
    categories: {
        connect: [{id: formData.get("categoryId") as string}]
    },
    userId: 
  }})

  revalidatePath("/"); // change to category / categoryId
}