import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;
    if (!userId) {
      return new NextResponse("Unauthed", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const createStore = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return  NextResponse.json(createStore);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  return new NextResponse("Hi", { status: 200 });
}
