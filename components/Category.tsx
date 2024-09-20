import React from 'react'
import prisma from '@/lib/db'
import { Separator } from "@/components/ui/separator"
import AddDocument from './AddDocument'


const getDocumentsOfCategory = async(id : string)=>{
return await prisma.category.findFirst({where: {id: id}, include: {documents: true,}})
}

const Category = async ({categoryId}: {categoryId : string}) => {

    const result = await getDocumentsOfCategory(categoryId)
    const count = result?.documents.length

  return (
    <div className='text-center'>
      <p className='text-2xl text-opacity-75 font-bold py-4'>
      {result?.name}
      </p>
      <Separator />
{ count === 0 &&
<div>
 <AddDocument categoryId={categoryId}/>
</div>
}

    </div>
  )
}

export default Category
