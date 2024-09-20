
import { Upload } from "lucide-react"
import prisma from "@/lib/db";
import Categories from "@/components/CategoryGroup";


const getAllCategories = async ()=>{
return await prisma.category.findMany()
}


export default async function Home() {

const result = await getAllCategories()

  return (
    <div className="py-3 px-4 w-full max-w-7xl m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-gray-800 min-h-[100px] p-3 border border-white rounded-md border-opacity-50 cursor-pointer flex items-center flex-col"> 
      <Upload height={40} width={40}/>
      <p>
        Uplaod Document!
      </p>
      </div>
      <Categories categories={result}/>
    </div>
  );
}
