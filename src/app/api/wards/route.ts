import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const wards = await db.ward.findMany({ orderBy: { number: "asc" } });
  return NextResponse.json({ wards });
}
