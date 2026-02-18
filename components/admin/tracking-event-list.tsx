"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, MapPin } from "lucide-react";
import type { TrackingEvent } from "@/lib/types";

interface TrackingEventListProps {
  events: TrackingEvent[];
  shipmentId: string;
}

function formatTimestamp(date: Date): string {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusColor(status: string): string {
  const lower = status.toLowerCase();
  if (lower.includes("delivered")) {
    return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  }
  if (lower.includes("transit") || lower.includes("departed")) {
    return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
  }
  if (lower.includes("customs")) {
    return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
  }
  if (lower.includes("out for delivery")) {
    return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
  }
  if (lower.includes("hold") || lower.includes("exception")) {
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
  }
  if (lower.includes("picked") || lower.includes("arrived")) {
    return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
  }
  return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
}

function getDotColor(status: string): string {
  const lower = status.toLowerCase();
  if (lower.includes("delivered")) return "bg-green-500";
  if (lower.includes("transit") || lower.includes("departed")) return "bg-blue-500";
  if (lower.includes("customs")) return "bg-purple-500";
  if (lower.includes("out for delivery")) return "bg-orange-500";
  if (lower.includes("hold") || lower.includes("exception")) return "bg-red-500";
  return "bg-gray-500";
}

export function TrackingEventList({ events, shipmentId }: TrackingEventListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(eventId: string) {
    if (!confirm("Are you sure you want to delete this tracking event?")) {
      return;
    }

    setDeletingId(eventId);

    try {
      const response = await fetch(`/api/tracking-events/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete tracking event");
      }

      toast.success("Tracking event deleted");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete event"
      );
    } finally {
      setDeletingId(null);
    }
  }

  if (events.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4">
        No tracking events yet.
      </p>
    );
  }

  return (
    <div className="relative space-y-0">
      {events.map((event, index) => (
        <div key={event.id} className="relative flex gap-4 pb-8 last:pb-0">
          {/* Timeline line */}
          {index < events.length - 1 && (
            <div className="absolute left-[11px] top-6 h-full w-0.5 bg-border" />
          )}

          {/* Timeline dot */}
          <div
            className={`relative z-10 mt-1 size-6 shrink-0 rounded-full border-2 border-background ${getDotColor(event.status)}`}
          />

          {/* Event content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className={getStatusColor(event.status)}
                  >
                    {event.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(event.timestamp)}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <MapPin className="size-3.5 text-muted-foreground" />
                  {event.location}
                </div>
                {event.description && (
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => handleDelete(event.id)}
                disabled={deletingId === event.id}
                className="shrink-0 text-muted-foreground hover:text-destructive"
              >
                <X className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
