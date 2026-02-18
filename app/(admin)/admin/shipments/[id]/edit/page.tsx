import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { ShipmentForm } from "@/components/admin/shipment-form";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Edit Shipment",
};

interface EditShipmentPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditShipmentPage({
  params,
}: EditShipmentPageProps) {
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
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/shipments/${shipment.id}`}>
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Shipment</h1>
        <p className="text-muted-foreground">
          Update shipment {shipment.trackingNumber}
        </p>
      </div>

      <ShipmentForm initialData={shipment} mode="edit" />
    </div>
  );
}
