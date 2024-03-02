import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { storeId: string }}) {
    try {
        const { storeId } = params;

        if (!storeId) {
            return new NextResponse("storeId is required", { status: 400 });
        }

        const findAllSizes = await prismadb.size.findMany({
            where: {
                storeId
            },
        });

        return NextResponse.json(findAllSizes);
    } catch (error) {
        console.log("[SIZES_GET]", error);
        return new NextResponse("Error", { status: 500 });
    }
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, value } = body;
        const { storeId } = params;
        if (!userId) {
            return new NextResponse("Unauthed", { status: 401 });
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        if (!value) {
            return new NextResponse("Value id is required", { status: 400 });
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

        const createSize = await prismadb.size.create({
            data: {
               name,
                value,
                storeId,
            },
        });

        return NextResponse.json(createSize);
    } catch (error) {
        console.log("[SIZES_POST]", error);
        return new NextResponse("Error", { status: 500 });
    }
}
async function PATCH(req: Request) { }


