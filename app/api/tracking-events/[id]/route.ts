import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updateData: Record<string, unknown> = {};

    if (body.location !== undefined) updateData.location = body.location;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.description !== undefined) updateData.description = body.description || null;
    if (body.timestamp !== undefined) updateData.timestamp = new Date(body.timestamp);

    const trackingEvent = await prisma.trackingEvent.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: trackingEvent });
  } catch (error) {
    console.error("Tracking event update error:", error);
    return NextResponse.json(
      { error: "Tracking event not found or update failed" },
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

    await prisma.trackingEvent.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Tracking event deleted" });
  } catch (error) {
    console.error("Tracking event delete error:", error);
    return NextResponse.json(
      { error: "Tracking event not found" },
      { status: 404 }
    );
  }
}
