"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Order } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`All Orders (${data.length || 0})`}
          description="Manage your orders"
        />
      </div>
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};

export default OrderClient;
