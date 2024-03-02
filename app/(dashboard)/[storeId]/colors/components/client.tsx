"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Color } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { ColorColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface ColorClientProps {
  data: ColorColumn[];
}

const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Colors (${data.length || 0})`}
          description="Manage your colors"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/colors/new`)}
        >
          Add
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="APIs" description="API calls" />
      <Separator />
      <ApiList entityIdName="colorId" entityName="colors"/>
    </>
  );
};

export default ColorClient;
