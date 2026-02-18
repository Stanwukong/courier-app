"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface TrackingEventFormProps {
  shipmentId: string;
  onSuccess: () => void;
}

interface EventFormValues {
  location: string;
  status: string;
  description: string;
  timestamp: string;
}

const eventStatuses = [
  "Picked Up",
  "In Transit",
  "Arrived at Facility",
  "Departed Facility",
  "At Customs",
  "Customs Cleared",
  "Out for Delivery",
  "Delivery Attempted",
  "Delivered",
  "On Hold",
  "Returned to Sender",
  "Exception",
];

export function TrackingEventForm({
  shipmentId,
  onSuccess,
}: TrackingEventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EventFormValues>({
    defaultValues: {
      location: "",
      status: "",
      description: "",
      timestamp: new Date().toISOString().slice(0, 16),
    },
  });

  const watchedStatus = watch("status");

  async function onSubmit(data: EventFormValues) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/tracking-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shipmentId,
          location: data.location,
          status: data.status,
          description: data.description || null,
          timestamp: data.timestamp ? new Date(data.timestamp).toISOString() : new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to add tracking event");
      }

      toast.success("Tracking event added successfully");
      reset();
      onSuccess();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add tracking event"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add Tracking Event</DialogTitle>
        <DialogDescription>
          Add a new tracking event for this shipment.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            {...register("location", { required: "Location is required" })}
            placeholder="e.g., New York, NY"
          />
          {errors.location && (
            <p className="text-sm text-destructive">{errors.location.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label>Status *</Label>
          <Select
            value={watchedStatus}
            onValueChange={(val) => setValue("status", val, { shouldValidate: true })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {eventStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input
            type="hidden"
            {...register("status", { required: "Status is required" })}
          />
          {errors.status && (
            <p className="text-sm text-destructive">{errors.status.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Optional details about this event..."
            rows={2}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="timestamp">Timestamp *</Label>
          <Input
            id="timestamp"
            type="datetime-local"
            {...register("timestamp", { required: "Timestamp is required" })}
          />
          {errors.timestamp && (
            <p className="text-sm text-destructive">{errors.timestamp.message}</p>
          )}
        </div>

        <DialogFooter>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Event"
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
