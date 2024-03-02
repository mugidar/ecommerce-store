import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { colorId } = params;

    if (!colorId)
      return new NextResponse("colorId is required", { status: 400 });

    const color = await prismadb.color.findUnique({
      where: { id: colorId },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return new NextResponse("Error", { status: 500 });
  }
}

export const PATCH = async (
  req: Request,
  { params }: { params: { colorId: string; storeId: string } }
) => {
  try {
    const { colorId, storeId } = params;
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;
    if (!userId) return new NextResponse("Unauthed", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!value)
      return new NextResponse("Value is required", { status: 400 });
    if (!colorId)

      return new NextResponse("colorId is required", { status: 400 });
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthed", { status: 403 });
    }
    const color = await prismadb.color.updateMany({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_PATCH]", error);
    return new NextResponse("Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) => {
  try {
    const { storeId, colorId } = params;
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthed", { status: 401 });
    if (!storeId)
      return new NextResponse("StoreId is required", { status: 400 });
    if (!colorId)
      return new NextResponse("colorId is required", { status: 400 });
    
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthed", { status: 403 });
    }
    const color = await prismadb.color.deleteMany({
      where: { id: colorId },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return new NextResponse("Error", { status: 500 });
  }
};
