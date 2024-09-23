"use server";
import { revalidatePath } from "next/cache";
import cloudinary from "cloudinary";
import fs from "node:fs/promises";
import prisma from "../db";
import { authOption } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";



cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECERET,
  });


export async function uploadDocument(formData: FormData) {

  try {
    const session = await getServerSession(authOption)
    const categoryId = formData.get("categoryId") as string
    const file = formData.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer)
    await fs.writeFile(`./public/uploads/${file.name}`, buffer);
    
    const result = await cloudinary.v2.uploader.upload(`./public/uploads/${file.name}`, {folder: "cms",resource_type: "auto", type: "upload"})
    
     await prisma.document.create({
      data:{
        url: result.secure_url,
        publicId: result.public_id,
        userId:  session?.user?.id,
        name: formData.get("documentName") as string,
        categories: {connect: [{id: categoryId}],
      }}
    })
    fs.unlink(`./public/uploads/${file.name}`)
    revalidatePath(`/categoryId/${categoryId}`); 
    return true
  } catch (error) {
    console.log(error)
  }

   


}