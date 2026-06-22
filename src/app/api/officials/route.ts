import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const officials = await db.official.findMany({
    include: { ward: true },
    orderBy: [{ title: "asc" }, { name: "asc" }],
  });
  return NextResponse.json({ officials });
}
