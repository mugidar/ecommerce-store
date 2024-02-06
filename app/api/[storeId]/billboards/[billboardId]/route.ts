import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { billboardId } = params;


    if (!billboardId)
      return new NextResponse("billboardId is required", { status: 400 });
    const storeByUserId = await prismadb.store.findUnique({
      where: {
        id: billboardId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthed", { status: 403 });
    }
    const billboard = await prismadb.billboard.deleteMany({
      where: { id: billboardId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Error", { status: 500 });
  }
}

export const PATCH = async (
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) => {
  try {
    const { billboardId, storeId } = params;
    const { userId } = auth();
    const body = await req.json();
    const { label, imgUrl } = body;
    if (!userId) return new NextResponse("Unauthed", { status: 401 });
    if (!label) return new NextResponse("Label is required", { status: 400 });
    if (!imgUrl)
      return new NextResponse("Img Url is required", { status: 400 });
    if (!billboardId)
      return new NextResponse("billboardId is required", { status: 400 });
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthed", { status: 403 });
    }
    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: billboardId,
      },
      data: {
        label,
        imgUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) => {
  try {
    const { storeId, billboardId } = params;
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthed", { status: 401 });
    if (!storeId)
      return new NextResponse("StoreId is required", { status: 400 });
    if (!billboardId)
      return new NextResponse("billboardId is required", { status: 400 });
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthed", { status: 403 });
    }
    const billboard = await prismadb.billboard.deleteMany({
      where: { id: billboardId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Error", { status: 500 });
  }
};
