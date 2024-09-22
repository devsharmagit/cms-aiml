import React from 'react'
import prisma from '@/lib/db'
import { Separator } from "@/components/ui/separator"
import AddDocument from './AddDocument'
import DocumentGroup from './DocumentGroup'


const getDocumentsOfCategory = async(id : string)=>{
return await prisma.category.findFirst({where: {id: id}, include: {documents: {include: {user: {select: {email: true, image: true}}}}}})
}

const Category = async ({categoryId}: {categoryId : string}) => {

    const result = await getDocumentsOfCategory(categoryId)
    console.log(result)
    const count = result?.documents.length

  return (
    <div className="py-3 px-4 w-full max-w-7xl m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className='col-span-full'>
        <div className='flex justify-between mb-5'>
      <p className='text-2xl text-opacity-75 font-bold py-4 ' >
      {result?.name}
      </p>
      <div>
 <AddDocument categoryId={categoryId}/>
      </div>
        </div>

      <Separator />

      </div>
      <div className='col-span-full text-center'>
<p> {count === 0 && "No document find. Click on the button to add."} </p>
      </div>
<div>
  {result && 
   <DocumentGroup documents={result.documents} />
  }
</div>

    </div>
  )
}

export default Category
