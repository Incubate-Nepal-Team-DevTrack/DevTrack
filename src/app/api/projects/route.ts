import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/projects — list with filters
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId") || undefined;
  const wardId = searchParams.get("wardId") || undefined;
  const status = searchParams.get("status") || undefined;
  const search = searchParams.get("search") || undefined;
  const featured = searchParams.get("featured") === "true" ? true : undefined;
  const limit = Number(searchParams.get("limit") || 50);

  const where: any = {};
  if (categoryId) where.categoryId = categoryId;
  if (wardId) where.wardId = wardId;
  if (status) where.status = status;
  if (featured) where.featured = true;
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { summary: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const projects = await db.project.findMany({
    where,
    include: {
      category: true,
      ward: true,
      milestones: { orderBy: { dueDate: "asc" } },
      budgetLines: true,
      updates: { orderBy: { createdAt: "desc" }, take: 3 },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return NextResponse.json({ projects });
}
