"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Category } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { CategoryColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface CategoryClientProps {
  data: CategoryColumn[];
}

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`All Categories (${data.length || 0})`}
          description="Manage your categories"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          Add
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="APIs" description="API calls" />
      <Separator />
      <ApiList entityIdName="categoryId" entityName="categories"/>
    </>
  );
};

export default CategoryClient;
