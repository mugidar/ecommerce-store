import prismadb from "@/lib/prismadb";
import BillboardForm from "../components/size-form";
import CategoryForm from "../components/size-form";
import SizeForm from "../components/size-form";

const CategoryPage = async ({
  params,
}: {
  params: {
    sizeId: string
  };
}) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });


  return (
    <div>
      <SizeForm initialData={size} />
    </div>
  );
};

export default CategoryPage;
