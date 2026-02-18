import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { CreateTrackingEventSchema } from "@/lib/validations/tracking-event";
import type { ShipmentStatus } from "@/app/generated/prisma/client";

// Map event status strings to ShipmentStatus enum values
function mapEventStatusToShipmentStatus(eventStatus: string): ShipmentStatus | null {
  const statusMap: Record<string, ShipmentStatus> = {
    "Pending": "PENDING",
    "Picked Up": "PICKED_UP",
    "In Transit": "IN_TRANSIT",
    "In Customs": "IN_CUSTOMS",
    "Out for Delivery": "OUT_FOR_DELIVERY",
    "Delivered": "DELIVERED",
    "Returned": "RETURNED",
    "On Hold": "ON_HOLD",
    // Also support uppercase/enum-style values
    "PENDING": "PENDING",
    "PICKED_UP": "PICKED_UP",
    "IN_TRANSIT": "IN_TRANSIT",
    "IN_CUSTOMS": "IN_CUSTOMS",
    "OUT_FOR_DELIVERY": "OUT_FOR_DELIVERY",
    "DELIVERED": "DELIVERED",
    "RETURNED": "RETURNED",
    "ON_HOLD": "ON_HOLD",
  };

  return statusMap[eventStatus] || null;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validated = CreateTrackingEventSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const trackingEvent = await prisma.trackingEvent.create({
      data: {
        shipmentId: validated.data.shipmentId,
        location: validated.data.location,
        status: validated.data.status,
        description: validated.data.description || null,
        timestamp: validated.data.timestamp
          ? new Date(validated.data.timestamp)
          : new Date(),
      },
    });

    // Update the parent shipment's status to match the event status
    const mappedStatus = mapEventStatusToShipmentStatus(validated.data.status);
    if (mappedStatus) {
      const updateData: Record<string, unknown> = { status: mappedStatus };

      // If delivered, also set actualDelivery date
      if (mappedStatus === "DELIVERED") {
        updateData.actualDelivery = trackingEvent.timestamp;
      }

      await prisma.shipment.update({
        where: { id: validated.data.shipmentId },
        data: updateData,
      });
    }

    return NextResponse.json(
      { success: true, data: trackingEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Tracking event creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
