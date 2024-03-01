import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { storeId: string }}) {
    try {
        const { storeId } = params;

        if (!storeId) {
            return new NextResponse("storeId is required", { status: 400 });
        }

        const findAllCategories = await prismadb.category.findMany({
            where: {
                storeId
            },
        });

        return NextResponse.json(findAllCategories);
    } catch (error) {
        console.log("[CATEGORIES_GET]", error);
        return new NextResponse("Error", { status: 500 });
    }
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, billboardId } = body;
        const { storeId } = params;
        if (!userId) {
            return new NextResponse("Unauthed", { status: 401 });
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        if (!billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
        }
        if (!storeId) {
            return new NextResponse("storeId is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                userId,
            },
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthed", { status: 403 });
        }

        const createCategory = await prismadb.category.create({
            data: {
               name,
                billboardId,
                storeId,
            },
        });

        return NextResponse.json(createCategory);
    } catch (error) {
        console.log("[CATEGORIES_POST]", error);
        return new NextResponse("Error", { status: 500 });
    }
}
async function PATCH(req: Request) { }


