import Category from '@/components/Category'
import React from 'react'


const Page = ({params : {categoryId}} : {params:{categoryId: string}}) => {
  
  return (
    <div className="py-3 px-4 w-full max-w-7xl m-auto ">
      <Category categoryId={categoryId} />
    </div>
  )
}

export default Page
