import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { TrackingResult, TrackingEvent } from "@/lib/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackingNumber: string }> }
) {
  try {
    const { trackingNumber } = await params;

    const shipment = await prisma.shipment.findFirst({
      where: {
        trackingNumber: {
          equals: trackingNumber,
          mode: "insensitive",
        },
      },
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

    const result: TrackingResult = {
      trackingNumber: shipment.trackingNumber,
      status: shipment.status,
      senderCity: shipment.senderCity,
      senderCountry: shipment.senderCountry,
      receiverCity: shipment.receiverCity,
      receiverCountry: shipment.receiverCountry,
      serviceType: shipment.serviceType,
      shipmentMode: shipment.shipmentMode,
      shipDate: shipment.shipDate,
      estimatedDelivery: shipment.estimatedDelivery,
      actualDelivery: shipment.actualDelivery,
      trackingEvents: shipment.trackingEvents.map((event: TrackingEvent) => ({
        id: event.id,
        location: event.location,
        status: event.status,
        description: event.description,
        timestamp: event.timestamp,
      })),
    };

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Tracking lookup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
