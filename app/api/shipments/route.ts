import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { CreateShipmentSchema } from "@/lib/validations/shipment";
import type { ShipmentStatus } from "@/app/generated/prisma/client";
import type { PaginatedResponse, Shipment } from "@/lib/types";

function generateTrackingNumber(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "USC-";
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "10", 10)));
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") as ShipmentStatus | null;

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { trackingNumber: { contains: search, mode: "insensitive" } },
        { senderName: { contains: search, mode: "insensitive" } },
        { receiverName: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status) {
      where.status = status;
    }

    const [shipments, total] = await Promise.all([
      prisma.shipment.findMany({
        where,
        include: {
          _count: {
            select: { trackingEvents: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.shipment.count({ where }),
    ]);

    const response: PaginatedResponse<Shipment & { _count: { trackingEvents: number } }> = {
      data: shipments,
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Shipment list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validated = CreateShipmentSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const trackingNumber = generateTrackingNumber();

    const shipment = await prisma.shipment.create({
      data: {
        trackingNumber,
        senderName: validated.data.senderName,
        senderEmail: validated.data.senderEmail || null,
        senderPhone: validated.data.senderPhone || null,
        senderAddress: validated.data.senderAddress,
        senderCity: validated.data.senderCity,
        senderCountry: validated.data.senderCountry,
        receiverName: validated.data.receiverName,
        receiverEmail: validated.data.receiverEmail || null,
        receiverPhone: validated.data.receiverPhone || null,
        receiverAddress: validated.data.receiverAddress,
        receiverCity: validated.data.receiverCity,
        receiverCountry: validated.data.receiverCountry,
        packageDescription: validated.data.packageDescription || null,
        weight: validated.data.weight ?? null,
        weightUnit: validated.data.weightUnit,
        dimensions: validated.data.dimensions || null,
        serviceType: validated.data.serviceType,
        shipmentMode: validated.data.shipmentMode,
        shipDate: validated.data.shipDate ? new Date(validated.data.shipDate) : null,
        estimatedDelivery: validated.data.estimatedDelivery
          ? new Date(validated.data.estimatedDelivery)
          : null,
      },
    });

    return NextResponse.json(
      { success: true, data: shipment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Shipment creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
