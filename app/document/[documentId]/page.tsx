import Document from '@/components/Document'
import React from 'react'

const Page = ({params : {documentId}} : {params:{documentId: string}}) => {
  return (
    <div>
      <Document documentId={documentId} />
    </div>
  )
}

export default Page
