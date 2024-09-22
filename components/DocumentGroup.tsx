
import React from "react";
import {  DocumentType } from "@/lib/types";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"




const DocumentGroup = ({documents}: {documents :DocumentType[]}) => {
  return (
    <>
    {documents.map(({ name, id, user }) => {
      
      return ( <Link href={`/document/${id}`} key={id}>
        <Card   className="min-h-[100px] flex flex-col justify-center items-center text-center cursor-pointer">
          <CardHeader>
            <CardTitle className="text-left text-2xl ">
              {name}
              </CardTitle>    
          </CardHeader>
          <CardDescription className="py-2 flex gap-1 items-center ">
            
          <Avatar className="h-6 w-6" >
  <AvatarImage  src={user?.image || ""} className="w-6 h-6 rounded-full object-cover " />
   
  <AvatarFallback> {user?.email[0]} </AvatarFallback>
  
</Avatar>
<p className="text-sm text-opacity-50">
  {user?.email}
</p>

          </CardDescription>
        </Card>
        </Link>
      );
    })}
    </>
  )
}

export default DocumentGroup
