import Document from '@/components/Document'
import prisma from '@/lib/db'
import React from 'react'

export async function generateStaticParams() {
  const documents = await prisma.document.findMany()
  return documents.map((post) => ({
    documentId: post.id,
  }))
}

const Page = ({params : {documentId}} : {params:{documentId: string}}) => {
  return (
    <div>
      <Document documentId={documentId} />
    </div>
  )
}

export default Page