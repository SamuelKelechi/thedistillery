import { NextResponse } from "next/server";

export async function POST(req) {
  const { key } = await req.json();

  if (key === process.env.ADMIN_PASSKEY) {
    const res = NextResponse.json({ status: "success" });

    // Set a secure cookie
    res.cookies.set("admin_passkey", key, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60, // 1 day
      path: "/",
    });

    return res;
  }

  return NextResponse.json({ status: "error" }, { status: 401 });
}