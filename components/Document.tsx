import prisma from "@/lib/db";
import React from "react";
import { AppBreadCrumb } from "./AppBreadCrumb";

const getDocument = async (id: string) => {
  return await prisma.document.findFirst({
    where: { id: id },
    include: { categories: true },
  });
};
const Document = async ({ documentId }: { documentId: string }) => {
  const result = await getDocument(documentId);

  return (
    <>
    <div className="w-full max-w-7xl m-auto py-4">
      <AppBreadCrumb
        links={[
          {
            title: result?.categories[0].name || "",
            link: `/category/${result?.categories[0].id}`,
          },
          {
            title: result?.name || "",
            link: `/category/${result?.categories[0].id}/document/${result?.id}`,
          },
        ]}
      />
    </div>
      <div className="flex justify-center">
        <iframe src={result?.url} className="w-[90vw] h-[90vh]" />
      </div>
    </>
  );
};

export default Document;
