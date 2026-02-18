import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { ShipmentTable } from "@/components/admin/shipment-table";
import { Plus } from "lucide-react";
import type { ShipmentStatus } from "@/lib/types";

export const metadata = {
  title: "Shipments",
};

const PAGE_SIZE = 10;

interface ShipmentsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
  }>;
}

export default async function ShipmentsPage({
  searchParams,
}: ShipmentsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const search = params.search || "";
  const statusFilter = params.status as ShipmentStatus | undefined;

  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { trackingNumber: { contains: search, mode: "insensitive" } },
      { senderName: { contains: search, mode: "insensitive" } },
      { receiverName: { contains: search, mode: "insensitive" } },
    ];
  }

  if (statusFilter) {
    where.status = statusFilter;
  }

  const [shipments, total] = await Promise.all([
    prisma.shipment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.shipment.count({ where }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shipments</h1>
          <p className="text-muted-foreground">
            Manage and track all shipments.
          </p>
        </div>
        <Button
          asChild
          className="bg-orange-500 text-white hover:bg-orange-600"
        >
          <Link href="/admin/shipments/new">
            <Plus className="size-4" />
            New Shipment
          </Link>
        </Button>
      </div>

      <ShipmentTable
        shipments={shipments}
        total={total}
        currentPage={page}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
}
