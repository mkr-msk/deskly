import { NextResponse } from "next/server";
import { registerUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await registerUser(email, password);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);

    if (error instanceof Error) {
      if (
        error.message === "Email and password are required" ||
        error.message === "User already exists"
      ) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
