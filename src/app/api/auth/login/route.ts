import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

// Simple credential auth (dev only — plaintext compare for demo)
export async function POST(req: NextRequest) {
  const { email, name } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  // For demo: lookup by email. If not exists and name provided, create.
  let user = await db.user.findUnique({ where: { email }, include: { ward: true } });
  if (!user) {
    if (!name) return NextResponse.json({ error: "User not found. Provide name to sign up." }, { status: 404 });
    user = await db.user.create({
      data: { email, name, passwordHash: "$demo$",
        avatarColor: ["#DC143C", "#003893", "#16A34A", "#F59E0B", "#7C3AED", "#DB2777", "#0EA5E9", "#EA580C"][Math.floor(Math.random()*8)],
      },
      include: { ward: true },
    });
  }

  const res = NextResponse.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role, expertise: user.expertise, ward: user.ward, avatarColor: user.avatarColor } });
  res.cookies.set("devtrack_uid", user.id, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
  res.cookies.set("devtrack_email", user.email, { sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
  return res;
}
