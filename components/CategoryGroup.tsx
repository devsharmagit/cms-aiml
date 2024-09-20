
import React from "react";
import { Category } from "@/lib/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const Categories = ({ categories }: { categories: Category[] }) => {
  return (
    <>
      {categories.map(({ name, id }) => {
        return ( <Link href={`category/${id}`} key={id}>
          <Card   className="min-h-[100px] flex justify-center items-center text-center cursor-pointer">
            <CardHeader>
              <CardTitle>{name}</CardTitle>    
            </CardHeader>
          </Card>
          </Link>
        );
      })}
    </>
  );
};

export default Categories;
