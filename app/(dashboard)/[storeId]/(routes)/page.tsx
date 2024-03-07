import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = paidOrders.reduce(
    (acc, cur) =>
     acc + cur.orderItems.reduce((acc, cur) => acc + Number(cur.product.price), 0),
    0
  );

  const inStockItems = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
      isArchived: false,
    },
  });
  const totalSales = await prismadb.order.count({
    where: {
      storeId: params.storeId,
      isPaid: true,
    },
  });

  return (
    <div className="flex gap-5">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl font-bold">
            {formatter.format(totalRevenue)}
          </h1>
        </CardContent>
      </Card>{" "}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>In Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl font-bold">{inStockItems.length}</h1>
        </CardContent>
      </Card>{" "}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl font-bold">{totalSales}</h1>
        </CardContent>
      </Card>{" "}
    </div>
  );
};

export default DashboardPage;
