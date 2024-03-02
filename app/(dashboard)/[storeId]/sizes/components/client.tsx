"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Size } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { SizeColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface SizeClientProps {
  data: SizeColumn[];
}

const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Sizes (${data.length || 0})`}
          description="Manage your sizes"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          Add
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="APIs" description="API calls" />
      <Separator />
      <ApiList entityIdName="sizeId" entityName="sizes"/>
    </>
  );
};

export default SizeClient;
