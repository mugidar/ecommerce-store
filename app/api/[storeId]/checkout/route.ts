import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { productIds } = await req.json();
    const { storeId } = params;
    console.log(productIds);

    if (!productIds || productIds.length === 0)
      return new NextResponse("Product ids are required ", { status: 400 });

    if (!storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }
    const products = await prismadb.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const order = await prismadb.order.create({
      data: {
        storeId: storeId,
        isPaid: true,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    });

    return NextResponse.json(
      { url: `/cart?success=1` },
      { headers: corsHeaders }
    );
    // const products
    /* 
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthed", { status: 403 });
    } */
  } catch (error) {
    console.log("[CHECKOUT_ERROR]", error);
    return new NextResponse("Error", { status: 500 });
  }
}
async function PATCH(req: Request) {}
