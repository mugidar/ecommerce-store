import React from "react";
import prismadb from "@/lib/prismadb";
import { OrderColumn } from "./components/columns";
import { format } from "date-fns";
import OrderClient from "./components/client";
import { formatter } from "@/lib/utils";

const Orders = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((acc, cur) => Number(cur.product.price) + acc, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <OrderClient data={formattedOrders} />
    </>
  );
};

export default Orders;
