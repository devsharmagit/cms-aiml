import prisma from '@/lib/db'
import React from 'react'

const getDocument = async(id: string)=>{
return await prisma.document.findFirst({where: {id: id}})
}
const Document = async ({documentId}: {documentId: string}) => {

    const result = await getDocument(documentId)

  return (
    <div className='flex justify-center'>
      <iframe src={result?.url} className='w-[90vw] h-[90vh]' />
    </div>
  )
}

export default Document
