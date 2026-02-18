import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Pencil, ArrowLeft } from "lucide-react";
import { ShipmentDetailClient } from "@/components/admin/shipment-detail-client";
import type { ShipmentStatus } from "@/lib/types";

export const metadata = {
  title: "Shipment Details",
};

const statusColors: Record<ShipmentStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  PICKED_UP: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  IN_TRANSIT: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  IN_CUSTOMS: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  OUT_FOR_DELIVERY: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  DELIVERED: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  RETURNED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  ON_HOLD: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
};

function formatStatus(status: string): string {
  return status.replace(/_/g, " ");
}

function formatDate(date: Date | null): string {
  if (!date) return "Not set";
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface ShipmentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ShipmentDetailPage({
  params,
}: ShipmentDetailPageProps) {
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
          <Link href="/admin/shipments">
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              {shipment.trackingNumber}
            </h1>
            <Badge
              variant="secondary"
              className={statusColors[shipment.status as ShipmentStatus]}
            >
              {formatStatus(shipment.status)}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Created {formatDate(shipment.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/shipments/${shipment.id}/edit`}>
              <Pencil className="size-4" />
              Edit
            </Link>
          </Button>
          <ShipmentDetailClient shipmentId={shipment.id} mode="delete-button" />
        </div>
      </div>

      {/* Shipment Info */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sender Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{shipment.senderName}</span>
            </div>
            {shipment.senderEmail && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span>{shipment.senderEmail}</span>
              </div>
            )}
            {shipment.senderPhone && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone</span>
                <span>{shipment.senderPhone}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Address</span>
              <span className="text-right">{shipment.senderAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">City</span>
              <span>{shipment.senderCity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Country</span>
              <span>{shipment.senderCountry}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receiver Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{shipment.receiverName}</span>
            </div>
            {shipment.receiverEmail && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span>{shipment.receiverEmail}</span>
              </div>
            )}
            {shipment.receiverPhone && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone</span>
                <span>{shipment.receiverPhone}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Address</span>
              <span className="text-right">{shipment.receiverAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">City</span>
              <span>{shipment.receiverCity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Country</span>
              <span>{shipment.receiverCountry}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Package Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <span className="text-muted-foreground">Description</span>
              <p className="font-medium">
                {shipment.packageDescription || "No description"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Weight</span>
              <p className="font-medium">
                {shipment.weight
                  ? `${shipment.weight} ${shipment.weightUnit}`
                  : "Not specified"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Dimensions</span>
              <p className="font-medium">
                {shipment.dimensions || "Not specified"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Service Type</span>
              <p className="font-medium">
                {formatStatus(shipment.serviceType)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <span className="text-muted-foreground">Shipment Mode</span>
              <p className="font-medium">{shipment.shipmentMode}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Ship Date</span>
              <p className="font-medium">{formatDate(shipment.shipDate)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Estimated Delivery</span>
              <p className="font-medium">
                {formatDate(shipment.estimatedDelivery)}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Actual Delivery</span>
              <p className="font-medium">
                {formatDate(shipment.actualDelivery)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Tracking Events */}
      <ShipmentDetailClient
        shipmentId={shipment.id}
        events={shipment.trackingEvents}
        mode="tracking-events"
      />
    </div>
  );
}
