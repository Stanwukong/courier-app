import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const contact = await prisma.contactSubmission.update({
      where: { id },
      data: { isRead: true },
    });

    return NextResponse.json({ success: true, data: contact });
  } catch (error) {
    console.error("Contact fetch error:", error);
    return NextResponse.json(
      { error: "Contact not found" },
      { status: 404 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.contactSubmission.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Contact deleted" });
  } catch (error) {
    console.error("Contact delete error:", error);
    return NextResponse.json(
      { error: "Contact not found" },
      { status: 404 }
    );
  }
}
