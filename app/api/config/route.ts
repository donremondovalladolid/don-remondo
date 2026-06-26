import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const { key, value, type } = await request.json();

    if (!key || !value || !type) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const config = await prisma.configStore.upsert({
      where: { key },
      update: { value, type },
      create: { key, value, type },
    });

    // Revalidate paths to reflect dynamic content updates instantly
    revalidatePath("/", "layout");
    
    return NextResponse.json(config);
  } catch (error) {
    console.error("Error saving config:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  try {
    const configs = await prisma.configStore.findMany(
      type ? { where: { type } } : undefined
    );
    return NextResponse.json(configs);
  } catch (error) {
    console.error("Error fetching configs:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
