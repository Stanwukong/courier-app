import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import type { DashboardStats } from "@/lib/types";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalShipments,
      pendingShipments,
      inTransitShipments,
      deliveredShipments,
      unreadContacts,
      shipmentsThisMonth,
    ] = await Promise.all([
      prisma.shipment.count(),
      prisma.shipment.count({ where: { status: "PENDING" } }),
      prisma.shipment.count({ where: { status: "IN_TRANSIT" } }),
      prisma.shipment.count({ where: { status: "DELIVERED" } }),
      prisma.contactSubmission.count({ where: { isRead: false } }),
      prisma.shipment.count({
        where: { createdAt: { gte: startOfMonth } },
      }),
    ]);

    const stats: DashboardStats = {
      totalShipments,
      pendingShipments,
      inTransitShipments,
      deliveredShipments,
      totalContacts: unreadContacts,
      unreadContacts,
    };

    return NextResponse.json({ success: true, data: { ...stats, shipmentsThisMonth } });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
