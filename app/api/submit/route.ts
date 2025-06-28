import { NextResponse } from 'next/server';
import { PrismaClient } from '../../generated/prisma';
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, resume } = body;

  try {
    const result = await prisma.application.create({
      data: { name, email, phone, resume },
    });

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
