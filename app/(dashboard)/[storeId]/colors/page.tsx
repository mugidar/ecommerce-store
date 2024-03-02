import React from "react";
import prismadb from "@/lib/prismadb";
import { ColorColumn } from "./components/columns";
import { format } from "date-fns";
import CategoryClient from "./components/client";
import ColorClient from "./components/client";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <ColorClient data={formattedColors} />
    </>
  );
};

export default ColorsPage;
