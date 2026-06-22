import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

// POST /api/forum/comments — create comment
export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("devtrack_uid")?.value;
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = await req.json();
  const { threadId, parentId, body: commentBody } = body;
  if (!threadId || !commentBody) return NextResponse.json({ error: "threadId & body required" }, { status: 400 });

  const user = await db.user.findUnique({ where: { id: userId } });
  const isOfficial = user?.role === "OFFICIAL" || user?.role === "ADMIN";

  const comment = await db.comment.create({
    data: {
      threadId,
      parentId: parentId || null,
      authorId: userId,
      body: commentBody,
      isOfficial,
    },
    include: { author: true, votes: true },
  });
  return NextResponse.json({ comment });
}
