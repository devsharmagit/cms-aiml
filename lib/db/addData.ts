import prisma from "./index";
import { categories } from "../json/categories";


export const addCategoriesToDB = async()=>{
    categories.forEach(async (title)=>{
        await prisma.category.create({data:{
            name: title
        }})
    })
}

