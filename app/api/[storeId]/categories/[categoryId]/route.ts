import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { categoryId } = params;

    if (!categoryId)
      return new NextResponse("categoryId is required", { status: 400 });

    const category = await prismadb.category.findUnique({
      where: { id: categoryId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Error", { status: 500 });
  }
}

export const PATCH = async (
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) => {
  try {
    const { categoryId, storeId } = params;
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;
    if (!userId) return new NextResponse("Unauthed", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!billboardId)
      return new NextResponse("billboardId is required", { status: 400 });
    if (!categoryId)

      return new NextResponse("categoryId is required", { status: 400 });
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthed", { status: 403 });
    }
    const category = await prismadb.category.updateMany({
      where: {
        id: categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) => {
  try {
    const { storeId, categoryId } = params;
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthed", { status: 401 });
    if (!storeId)
      return new NextResponse("StoreId is required", { status: 400 });
    if (!categoryId)
      return new NextResponse("categoryId is required", { status: 400 });
    
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthed", { status: 403 });
    }
    const category = await prismadb.category.deleteMany({
      where: { id: categoryId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Error", { status: 500 });
  }
};
