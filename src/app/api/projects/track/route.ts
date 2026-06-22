import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

// POST /api/projects/track?projectId=...  — toggle tracking for current user
export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("devtrack_uid")?.value;
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  if (!projectId) return NextResponse.json({ error: "projectId required" }, { status: 400 });

  const existing = await db.trackedProject.findUnique({
    where: { userId_projectId: { userId, projectId } },
  });
  if (existing) {
    await db.trackedProject.delete({ where: { id: existing.id } });
    return NextResponse.json({ tracked: false });
  }
  await db.trackedProject.create({ data: { userId, projectId } });
  return NextResponse.json({ tracked: true });
}

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("devtrack_uid")?.value;
  if (!userId) return NextResponse.json({ projectIds: [] });
  const tracked = await db.trackedProject.findMany({
    where: { userId },
    select: { projectId: true },
  });
  return NextResponse.json({ projectIds: tracked.map((t) => t.projectId) });
}
