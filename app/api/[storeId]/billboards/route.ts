import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

async function GET(_req: Request, { params }: { params: { storeId: string }}) {
    try {
        const { storeId } = params;

        if (!storeId) {
            return new NextResponse("storeId is required", { status: 400 });
        }

        const findAllBillboards = await prismadb.billboard.findMany({
            where: {
                storeId
            },
        });

        return NextResponse.json(findAllBillboards);
    } catch (error) {
        console.log("[BILLBOARDS_GET]", error);
        return new NextResponse("Error", { status: 500 });
    }
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { label, imgUrl } = body;
        const { storeId } = params;
        if (!userId) {
            return new NextResponse("Unauthed", { status: 401 });
        }
        if (!label) {
            return new NextResponse("Label is required", { status: 400 });
        }
        if (!imgUrl) {
            return new NextResponse("Image URL is required", { status: 400 });
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

        const createBillboard = await prismadb.billboard.create({
            data: {
                label,
                imgUrl,
                storeId,
            },
        });

        return NextResponse.json(createBillboard);
    } catch (error) {
        console.log("[BILLBOARDS_POST]", error);
        return new NextResponse("Error", { status: 500 });
    }
}
async function PATCH(req: Request) { }


