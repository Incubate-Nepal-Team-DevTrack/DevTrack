import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("devtrack_uid")?.value;
  if (!userId) return NextResponse.json({ user: null });
  const user = await db.user.findUnique({
    where: { id: userId },
    include: { ward: true },
  });
  if (!user) return NextResponse.json({ user: null });
  return NextResponse.json({
    user: {
      id: user.id, email: user.email, name: user.name, role: user.role,
      expertise: user.expertise, ward: user.ward, avatarColor: user.avatarColor, bio: user.bio,
    },
  });
}
