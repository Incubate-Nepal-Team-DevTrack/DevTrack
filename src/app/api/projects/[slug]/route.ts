import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await db.project.findUnique({
    where: { slug },
    include: {
      category: true,
      ward: true,
      milestones: { orderBy: { dueDate: "asc" } },
      budgetLines: true,
      updates: { orderBy: { createdAt: "desc" }, include: { author: true } },
      threads: {
        include: {
          author: true,
          comments: {
            include: { author: true, votes: true },
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
      },
    },
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ project });
}
