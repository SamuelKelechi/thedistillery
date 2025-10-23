import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ status: "success" });
  res.cookies.delete("admin_passkey");
  return res;
}