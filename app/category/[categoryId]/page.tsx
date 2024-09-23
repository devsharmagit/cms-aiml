import Category from '@/components/Category'
import prisma from '@/lib/db'
import React from 'react'

export async function generateStaticParams() {
  const categories = await prisma.category.findMany()
  return categories.map((post) => ({
    categoryId: post.id,
  }))
}

const Page = ({params : {categoryId}} : {params:{categoryId: string}}) => {
  
  return (
    <div className="py-3 px-4 w-full max-w-7xl m-auto ">
      <Category categoryId={categoryId} />
    </div>
  )
}

export default Page
