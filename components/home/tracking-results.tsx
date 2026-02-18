"use client";

import type { TrackingResult } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Calendar,
  Package,
  ArrowRight,
} from "lucide-react";

const statusColorMap: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PICKED_UP: "bg-blue-100 text-blue-800",
  IN_TRANSIT: "bg-indigo-100 text-indigo-800",
  IN_CUSTOMS: "bg-purple-100 text-purple-800",
  OUT_FOR_DELIVERY: "bg-cyan-100 text-cyan-800",
  DELIVERED: "bg-green-100 text-green-800",
  RETURNED: "bg-red-100 text-red-800",
  ON_HOLD: "bg-orange-100 text-orange-800",
};

function formatDate(date: Date | string | null): string {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatStatus(status: string): string {
  return status.replace(/_/g, " ");
}

interface TrackingResultsProps {
  result: TrackingResult;
}

export default function TrackingResults({ result }: TrackingResultsProps) {
  const sortedEvents = [...result.trackingEvents].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="mt-6 space-y-6">
      {/* Shipment Summary Card */}
      <Card className="border-slate-200">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-lg">
              Tracking:{" "}
              <span className="font-bold text-slate-900">
                {result.trackingNumber}
              </span>
            </CardTitle>
            <Badge
              className={`${statusColorMap[result.status] ?? "bg-gray-100 text-gray-800"} border-0`}
            >
              {formatStatus(result.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Route */}
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin className="h-4 w-4 shrink-0 text-orange-500" />
              <span>
                {result.senderCity}, {result.senderCountry}
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
              <span>
                {result.receiverCity}, {result.receiverCountry}
              </span>
            </div>

            {/* Service Type */}
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Package className="h-4 w-4 shrink-0 text-orange-500" />
              <span>{formatStatus(result.serviceType)}</span>
              <span className="text-slate-400">|</span>
              <span>{formatStatus(result.shipmentMode)}</span>
            </div>

            {/* Ship Date */}
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="h-4 w-4 shrink-0 text-orange-500" />
              <span>Shipped: {formatDate(result.shipDate)}</span>
            </div>

            {/* Estimated Delivery */}
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="h-4 w-4 shrink-0 text-orange-500" />
              <span>
                {result.actualDelivery
                  ? `Delivered: ${formatDate(result.actualDelivery)}`
                  : `Est. Delivery: ${formatDate(result.estimatedDelivery)}`}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tracking Timeline */}
      {sortedEvents.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Tracking History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {sortedEvents.map((event, index) => {
                const isLatest = index === 0;
                return (
                  <div key={event.id} className="relative flex gap-4 pb-8 last:pb-0">
                    {/* Vertical line */}
                    {index < sortedEvents.length - 1 && (
                      <div className="absolute left-[9px] top-5 h-full w-0.5 bg-slate-200" />
                    )}

                    {/* Dot */}
                    <div
                      className={`relative z-10 mt-1 h-5 w-5 shrink-0 rounded-full border-2 ${
                        isLatest
                          ? "border-green-500 bg-green-500"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isLatest && (
                        <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-25" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                        <span
                          className={`text-sm font-semibold ${
                            isLatest ? "text-green-700" : "text-slate-700"
                          }`}
                        >
                          {formatStatus(event.status)}
                        </span>
                        <span className="text-xs text-slate-400">
                          {formatDateTime(event.timestamp)}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                      {event.description && (
                        <p className="mt-1 text-sm text-slate-600">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
