import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { UpdateShipmentSchema } from "@/lib/validations/shipment";

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

    const shipment = await prisma.shipment.findUnique({
      where: { id },
      include: {
        trackingEvents: {
          orderBy: { timestamp: "desc" },
        },
      },
    });

    if (!shipment) {
      return NextResponse.json(
        { error: "Shipment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: shipment });
  } catch (error) {
    console.error("Shipment fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

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
    const validated = UpdateShipmentSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = { ...validated.data };

    // Convert date strings to Date objects
    if (validated.data.shipDate) {
      updateData.shipDate = new Date(validated.data.shipDate);
    } else if (validated.data.shipDate === "") {
      updateData.shipDate = null;
    }

    if (validated.data.estimatedDelivery) {
      updateData.estimatedDelivery = new Date(validated.data.estimatedDelivery);
    } else if (validated.data.estimatedDelivery === "") {
      updateData.estimatedDelivery = null;
    }

    if (validated.data.actualDelivery) {
      updateData.actualDelivery = new Date(validated.data.actualDelivery);
    } else if (validated.data.actualDelivery === "") {
      updateData.actualDelivery = null;
    }

    // Convert empty strings to null for optional fields
    if (updateData.senderEmail === "") updateData.senderEmail = null;
    if (updateData.senderPhone === "") updateData.senderPhone = null;
    if (updateData.receiverEmail === "") updateData.receiverEmail = null;
    if (updateData.receiverPhone === "") updateData.receiverPhone = null;
    if (updateData.packageDescription === "") updateData.packageDescription = null;
    if (updateData.dimensions === "") updateData.dimensions = null;

    const shipment = await prisma.shipment.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: shipment });
  } catch (error) {
    console.error("Shipment update error:", error);
    return NextResponse.json(
      { error: "Shipment not found or update failed" },
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

    await prisma.shipment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Shipment deleted" });
  } catch (error) {
    console.error("Shipment delete error:", error);
    return NextResponse.json(
      { error: "Shipment not found" },
      { status: 404 }
    );
  }
}
