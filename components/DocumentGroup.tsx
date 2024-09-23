import React from "react";
import { DocumentType } from "@/lib/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText } from "lucide-react";

const DocumentGroup = ({
  documents,
  categoryId,
}: {
  documents: DocumentType[];
  categoryId: string;
}) => {
  return (
    <>
      {documents.map(({ name, id, user }) => {
        return (
          <Link href={`/category/${categoryId}/${id}`} key={id}>
          <Card   className="min-h-[150px] top-0 flex flex-col py-2 h-full text-center ease-out duration-500 transition-all relative hover:top-[-5px] cursor-pointer hover:border-white hover:bg-[rgb(30,30,30)] opacity-85 hover:opacity-100">
               <CardHeader>
                <FileText width={50} height={50} />
                <CardTitle className="text-left font-medium text-lg leading-tight">
                  {name}
                  </CardTitle>
              </CardHeader>
              <div className="py-2 px-4 flex gap-1 items-center ">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={user?.image || ""}
                    className="w-6 h-6 rounded-full object-cover "
                  />
                  <AvatarFallback> {user?.email[0]} </AvatarFallback>
                </Avatar>
                <p className="text-sm text-opacity-50 opacity-50">{user?.email}</p>
              </div>
            </Card>
          </Link>
        );
      })}
    </>
  );
};

export default DocumentGroup;
