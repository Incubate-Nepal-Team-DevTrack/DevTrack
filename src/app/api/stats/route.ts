import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const [projects, citizens, officials, wards, threads, betaCount, totalBudget, totalSpent] = await Promise.all([
    db.project.count(),
    db.user.count({ where: { role: "CITIZEN" } }),
    db.official.count(),
    db.ward.count(),
    db.forumThread.count(),
    db.betaFeedback.count(),
    db.project.aggregate({ _sum: { budgetAllocated: true } }),
    db.project.aggregate({ _sum: { budgetSpent: true } }),
  ]);

  const statusBreakdown = await db.project.groupBy({
    by: ["status"],
    _count: true,
  });

  const categoryBreakdown = await db.project.groupBy({
    by: ["categoryId"],
    _count: true,
    _sum: { budgetAllocated: true },
  });
  const categories = await db.category.findMany();
  const categoryMap: Record<string, any> = {};
  for (const c of categories) categoryMap[c.id] = c;
  const categoriesWithCounts = categoryBreakdown.map((b) => ({
    category: categoryMap[b.categoryId],
    count: b._count,
    budget: b._sum.budgetAllocated,
  }));

  return NextResponse.json({
    stats: {
      projects,
      citizens,
      officials,
      wards,
      threads,
      betaCount,
      totalBudget: totalBudget._sum.budgetAllocated || 0,
      totalSpent: totalSpent._sum.budgetSpent || 0,
    },
    statusBreakdown: statusBreakdown.map((s) => ({ status: s.status, count: s._count })),
    categoriesWithCounts,
  });
}
