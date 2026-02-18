"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Plus, Loader2 } from "lucide-react";
import { TrackingEventList } from "@/components/admin/tracking-event-list";
import { TrackingEventForm } from "@/components/admin/tracking-event-form";
import type { TrackingEvent } from "@/lib/types";

interface ShipmentDetailClientProps {
  shipmentId: string;
  events?: TrackingEvent[];
  mode: "delete-button" | "tracking-events";
}

export function ShipmentDetailClient({
  shipmentId,
  events = [],
  mode,
}: ShipmentDetailClientProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addEventDialogOpen, setAddEventDialogOpen] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/shipments/${shipmentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete shipment");
      }

      toast.success("Shipment deleted successfully");
      router.push("/admin/shipments");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete shipment"
      );
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  }

  if (mode === "delete-button") {
    return (
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">
            <Trash2 className="size-4" />
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Shipment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this shipment? This action cannot
              be undone. All tracking events associated with this shipment will
              also be deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Shipment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tracking Events</CardTitle>
        <Dialog open={addEventDialogOpen} onOpenChange={setAddEventDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              <Plus className="size-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <TrackingEventForm
            shipmentId={shipmentId}
            onSuccess={() => {
              setAddEventDialogOpen(false);
              router.refresh();
            }}
          />
        </Dialog>
      </CardHeader>
      <CardContent>
        <TrackingEventList events={events} shipmentId={shipmentId} />
      </CardContent>
    </Card>
  );
}
