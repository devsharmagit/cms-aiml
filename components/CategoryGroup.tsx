
import React from "react";
import { Category } from "@/lib/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Folder } from "lucide-react";

const Categories = ({ categories }: { categories: Category[] }) => {
  return (
    <>
      {categories.map(({ name, id }) => {
        return ( <Link href={`category/${id}`} key={id} className="h-full block">
          <Card   className="min-h-[150px] top-0 flex flex-col py-2 h-full text-center ease-out duration-500 transition-all relative hover:top-[-5px] cursor-pointer hover:border-white hover:bg-[rgb(30,30,30)] opacity-85 hover:opacity-100">
            <CardHeader className=" ">
          <Folder width={50} height={50}/>
              <CardTitle className="text-left font-medium text-lg leading-tight">
                {name}
                </CardTitle>    
            </CardHeader>
          </Card>
          </Link>
        );
      })}
    </>
  );
};

export default Categories;
