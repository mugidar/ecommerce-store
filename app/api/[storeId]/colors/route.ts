import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { storeId: string }}) {
    try {
        const { storeId } = params;

        if (!storeId) {
            return new NextResponse("storeId is required", { status: 400 });
        }

        const findAllColors = await prismadb.color.findMany({
            where: {
                storeId
            },
        });

        return NextResponse.json(findAllColors);
    } catch (error) {
        console.log("[COLORS_GET]", error);
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

        const createSize = await prismadb.color.create({
            data: {
               name,
                value,
                storeId,
            },
        });

        return NextResponse.json(createSize);
    } catch (error) {
        console.log("[COLORS_POST]", error);
        return new NextResponse("Error", { status: 500 });
    }
}
async function PATCH(req: Request) { }


