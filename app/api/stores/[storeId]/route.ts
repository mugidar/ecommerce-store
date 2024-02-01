import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse("HI", { status: 200 });
}

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { storeId } = params;
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;
    if (!userId) return new NextResponse("Unauthed", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!storeId)
      return new NextResponse("StoreId is required", { status: 400 });

    const store = await prismadb.store.updateMany({
      where: {
        id: storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { storeId } = params;
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthed", { status: 401 });
    if (!storeId)
      return new NextResponse("StoreId is required", { status: 400 });

    const store = await prismadb.store.delete({
      where: { id: storeId, userId },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("Error", { status: 500 });
  }
};
