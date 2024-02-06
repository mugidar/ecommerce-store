import React from "react";
import BillboardClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";

const Billboards = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <BillboardClient data={billboards} />
      <div>
        {billboards.map((billboard) => (
          <span className="bg-red-500" key={billboard.id}>
            {billboard.label}
          </span>
        ))}
      </div>
    </>
  );
};

export default Billboards;
