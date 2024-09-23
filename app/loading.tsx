import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AppBreadCrumb } from "@/components/AppBreadCrumb";

const loading = () => {
  return (
    <div className="py-3 px-4 w-full max-w-7xl m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="col-span-full">
        <Skeleton className="h-8 w-[350px]" />
        <Skeleton className="h-5 w-[200px] mt-2" />
      </div>
      <div className="col-span-full">
        <AppBreadCrumb links={[]} />
      </div>
      {[0, 1, 2, 3, 4, 5, 6].map((id) => {
        return <Skeleton key={id} className="w-full min-h-[100px]" />;
      })}
    </div>
  );
};

export default loading;