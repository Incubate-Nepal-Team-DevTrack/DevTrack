import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("devtrack_uid");
  res.cookies.delete("devtrack_email");
  return res;
}
