import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  const feedback = await db.betaFeedback.findMany({
    include: { user: { select: { name: true, avatarColor: true, role: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ feedback });
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("devtrack_uid")?.value || undefined;
  const body = await req.json();
  const { authorName, category, body: fbBody, rating } = body;
  if (!authorName || !fbBody || !category) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const feedback = await db.betaFeedback.create({
    data: {
      userId,
      authorName,
      category,
      body: fbBody,
      rating: Number(rating) || 5,
    },
  });
  return NextResponse.json({ feedback });
}
