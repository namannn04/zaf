import { NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, resume } = body;

  if (!phone || typeof phone !== "string") {
    return NextResponse.json(
      { success: false, error: "Phone number is required" },
      { status: 400 }
    );
  }

  const cleanPhone = phone.replace(/\D/g, "");
  if (cleanPhone.length !== 10) {
    return NextResponse.json(
      { success: false, error: "Phone number must be exactly 10 digits" },
      { status: 400 }
    );
  }

  const phoneNumber = BigInt(cleanPhone);

  try {
    console.log("✅ About to save to DB with data:", {
      name,
      email,
      phone: phoneNumber,
      resume,
    });

    const result = await prisma.application.create({
      data: {
        name,
        email,
        phone: phoneNumber,
        resume: resume || "Not provided",
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        phone: result.phone.toString(),
      },
    });
  } catch (err: any) {
    console.error("❌ Prisma error:");
    console.error("Message:", err?.message);
    console.error("Full error object:", err);

    return NextResponse.json(
      {
        success: false,
        error: "Server error",
        message: err?.message,
      },
      { status: 500 }
    );
  }
}
