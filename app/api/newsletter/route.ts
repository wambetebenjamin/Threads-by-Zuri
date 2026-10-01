import { NextResponse } from "next/server";
import { addToSet, pushRecord } from "@/lib/storage";

export const dynamic = "force-dynamic";

/** POST /api/newsletter — save a subscriber email (Vercel KV when configured) */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const added = await addToSet("zuri:newsletter:emails", email);
    if (added) {
      await pushRecord("zuri:newsletter:log", {
        email,
        subscribedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      ok: true,
      message: added
        ? "Karibu to the Zuri Circle! Watch your inbox on Friday."
        : "You're already in the Circle — karibu tena!",
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
