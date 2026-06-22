import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

// POST /api/comments/vote?commentId=...&value=1
export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("devtrack_uid")?.value;
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const commentId = searchParams.get("commentId");
  const value = Number(searchParams.get("value") || "1");
  if (!commentId) return NextResponse.json({ error: "commentId required" }, { status: 400 });

  const existing = await db.vote.findFirst({ where: { commentId, userId } });
  if (existing) {
    if (existing.value === value) {
      await db.vote.delete({ where: { id: existing.id } });
      return NextResponse.json({ vote: 0 });
    }
    await db.vote.update({ where: { id: existing.id }, data: { value } });
    return NextResponse.json({ vote: value });
  }
  await db.vote.create({ data: { commentId, userId, value } });
  return NextResponse.json({ vote: value });
}
