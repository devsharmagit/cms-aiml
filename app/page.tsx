import prisma from "@/lib/db";
import Categories from "@/components/CategoryGroup";
import { AppBreadCrumb } from "@/components/AppBreadCrumb";
import SearchBar from "@/components/SearchBar";

const getAllCategories = async () => {
  return await prisma.category.findMany();
};

export default async function Home() {
  const result = await getAllCategories();

  return (
    <div className="py-3 px-4 w-full max-w-7xl m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="col-span-full">
        <h1 className="text-4xl font-bold">All Topics</h1>
        <p className="mt-2 opacity-50">Total topics : {result.length}</p>
      </div>
      <div className="col-span-full">
        <AppBreadCrumb links={[]} />
      </div>
      <div className="col-span-full">
      <SearchBar allCategories={result}/>
      </div>
      <Categories categories={result} />
    </div>
  );
}
