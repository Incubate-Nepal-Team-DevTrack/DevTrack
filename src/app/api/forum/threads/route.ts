import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

// GET /api/forum/threads?projectId=...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId") || undefined;
  const threads = await db.forumThread.findMany({
    where: projectId ? { projectId } : { projectId: null },
    include: {
      author: true,
      project: { select: { id: true, title: true, slug: true, category: { select: { color: true } } } },
      comments: {
        include: { author: true, votes: true },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ threads });
}

// POST a new thread
export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("devtrack_uid")?.value;
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = await req.json();
  const { title, body: threadBody, projectId } = body;
  if (!title || !threadBody) return NextResponse.json({ error: "title & body required" }, { status: 400 });

  const thread = await db.forumThread.create({
    data: {
      title,
      body: threadBody,
      projectId: projectId || null,
      authorId: userId,
    },
    include: {
      author: true,
      project: { select: { id: true, title: true, slug: true, category: { select: { color: true } } } },
      comments: {
        include: { author: true, votes: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });
  return NextResponse.json({ thread });
}
