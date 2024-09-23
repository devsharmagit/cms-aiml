import React from "react";
import prisma from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import AddDocument from "./AddDocument";
import DocumentGroup from "./DocumentGroup";
import { AppBreadCrumb } from "./AppBreadCrumb";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/options";

const getDocumentsOfCategory = async (id: string) => {
  return await prisma.category.findFirst({
    where: { id: id },
    include: {
      documents: {
        include: { user: { select: { email: true, image: true } } },
      },
    },
  });
};

const Category = async ({ categoryId }: { categoryId: string }) => {
  const result = await getDocumentsOfCategory(categoryId);
  const count = result?.documents.length;
  const session = await getServerSession(authOption);

  return (
    <div className="py-3 px-4 w-full max-w-7xl m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="col-span-full">
        <AppBreadCrumb
          links={[
            { title: result?.name || "", link: `/category/${result?.id}` },
          ]}
        />
      </div>
      <div className="col-span-full">
        <div className="flex justify-between items-center">
          <p className="text-2xl text-opacity-75 font-bold py-4 ">
            {result?.name}
          </p>
          <div>
            {session?.user.email === "devsharmasoe@gmail.com" && (
              <AddDocument categoryId={categoryId} />
            )}
          </div>
        </div>

        <Separator />
      </div>
      <div className="col-span-full text-center">
        <p>
          {count === 0 && "No document find. Click on the button to add."}
        </p>
      </div>

      {result && (
        <DocumentGroup documents={result.documents} categoryId={categoryId} />
      )}
    </div>
  );
};

export default Category;
