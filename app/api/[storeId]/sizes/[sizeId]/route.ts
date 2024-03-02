import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { sizeId } = params;

    if (!sizeId)
      return new NextResponse("sizeId is required", { status: 400 });

    const size = await prismadb.size.findUnique({
      where: { id: sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return new NextResponse("Error", { status: 500 });
  }
}

export const PATCH = async (
  req: Request,
  { params }: { params: { sizeId: string; storeId: string } }
) => {
  try {
    const { sizeId, storeId } = params;
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;
    if (!userId) return new NextResponse("Unauthed", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!value)
      return new NextResponse("Value is required", { status: 400 });
    if (!sizeId)

      return new NextResponse("sizeId is required", { status: 400 });
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthed", { status: 403 });
    }
    const size = await prismadb.size.updateMany({
      where: {
        id: sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_PATCH]", error);
    return new NextResponse("Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) => {
  try {
    const { storeId, sizeId } = params;
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthed", { status: 401 });
    if (!storeId)
      return new NextResponse("StoreId is required", { status: 400 });
    if (!sizeId)
      return new NextResponse("sizeId is required", { status: 400 });
    
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthed", { status: 403 });
    }
    const size = await prismadb.size.deleteMany({
      where: { id: sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return new NextResponse("Error", { status: 500 });
  }
};
