"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import type { ShipmentWithEvents } from "@/lib/types";

interface ShipmentFormProps {
  initialData?: ShipmentWithEvents;
  mode: "create" | "edit";
}

interface ShipmentFormValues {
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderAddress: string;
  senderCity: string;
  senderCountry: string;
  receiverName: string;
  receiverEmail: string;
  receiverPhone: string;
  receiverAddress: string;
  receiverCity: string;
  receiverCountry: string;
  packageDescription: string;
  weight: string;
  weightUnit: string;
  dimensions: string;
  serviceType: string;
  shipmentMode: string;
  shipDate: string;
  estimatedDelivery: string;
  status: string;
}

const serviceTypes = [
  { value: "AIR_FREIGHT", label: "Air Freight" },
  { value: "OCEAN_FREIGHT", label: "Ocean Freight" },
  { value: "ROAD_FREIGHT", label: "Road Freight" },
  { value: "EXPRESS_COURIER", label: "Express Courier" },
  { value: "SOC_MOVEMENT", label: "SOC Movement" },
];

const shipmentModes = [
  { value: "INTERNATIONAL", label: "International" },
  { value: "DOMESTIC", label: "Domestic" },
];

const shipmentStatuses = [
  { value: "PENDING", label: "Pending" },
  { value: "PICKED_UP", label: "Picked Up" },
  { value: "IN_TRANSIT", label: "In Transit" },
  { value: "IN_CUSTOMS", label: "In Customs" },
  { value: "OUT_FOR_DELIVERY", label: "Out for Delivery" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "RETURNED", label: "Returned" },
  { value: "ON_HOLD", label: "On Hold" },
];

function formatDateForInput(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}

export function ShipmentForm({ initialData, mode }: ShipmentFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ShipmentFormValues>({
    defaultValues: {
      senderName: initialData?.senderName || "",
      senderEmail: initialData?.senderEmail || "",
      senderPhone: initialData?.senderPhone || "",
      senderAddress: initialData?.senderAddress || "",
      senderCity: initialData?.senderCity || "",
      senderCountry: initialData?.senderCountry || "",
      receiverName: initialData?.receiverName || "",
      receiverEmail: initialData?.receiverEmail || "",
      receiverPhone: initialData?.receiverPhone || "",
      receiverAddress: initialData?.receiverAddress || "",
      receiverCity: initialData?.receiverCity || "",
      receiverCountry: initialData?.receiverCountry || "",
      packageDescription: initialData?.packageDescription || "",
      weight: initialData?.weight?.toString() || "",
      weightUnit: initialData?.weightUnit || "kg",
      dimensions: initialData?.dimensions || "",
      serviceType: initialData?.serviceType || "EXPRESS_COURIER",
      shipmentMode: initialData?.shipmentMode || "INTERNATIONAL",
      shipDate: formatDateForInput(initialData?.shipDate),
      estimatedDelivery: formatDateForInput(initialData?.estimatedDelivery),
      status: initialData?.status || "PENDING",
    },
  });

  const watchedServiceType = watch("serviceType");
  const watchedShipmentMode = watch("shipmentMode");
  const watchedWeightUnit = watch("weightUnit");
  const watchedStatus = watch("status");

  async function onSubmit(data: ShipmentFormValues) {
    setIsSubmitting(true);

    try {
      const payload = {
        ...data,
        weight: data.weight ? parseFloat(data.weight) : null,
        shipDate: data.shipDate || null,
        estimatedDelivery: data.estimatedDelivery || null,
      };

      const url =
        mode === "create"
          ? "/api/shipments"
          : `/api/shipments/${initialData?.id}`;

      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save shipment");
      }

      toast.success(
        mode === "create"
          ? "Shipment created successfully"
          : "Shipment updated successfully"
      );
      router.push("/admin/shipments");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save shipment"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Sender Information */}
      <Card>
        <CardHeader>
          <CardTitle>Sender Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="senderName">Full Name *</Label>
              <Input
                id="senderName"
                {...register("senderName", { required: "Sender name is required" })}
                placeholder="John Doe"
              />
              {errors.senderName && (
                <p className="text-sm text-destructive">{errors.senderName.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="senderEmail">Email</Label>
              <Input
                id="senderEmail"
                type="email"
                {...register("senderEmail")}
                placeholder="john@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="senderPhone">Phone</Label>
              <Input
                id="senderPhone"
                {...register("senderPhone")}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="senderAddress">Address *</Label>
              <Input
                id="senderAddress"
                {...register("senderAddress", { required: "Address is required" })}
                placeholder="123 Main St"
              />
              {errors.senderAddress && (
                <p className="text-sm text-destructive">{errors.senderAddress.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="senderCity">City *</Label>
              <Input
                id="senderCity"
                {...register("senderCity", { required: "City is required" })}
                placeholder="New York"
              />
              {errors.senderCity && (
                <p className="text-sm text-destructive">{errors.senderCity.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="senderCountry">Country *</Label>
              <Input
                id="senderCountry"
                {...register("senderCountry", { required: "Country is required" })}
                placeholder="United States"
              />
              {errors.senderCountry && (
                <p className="text-sm text-destructive">{errors.senderCountry.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Receiver Information */}
      <Card>
        <CardHeader>
          <CardTitle>Receiver Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="receiverName">Full Name *</Label>
              <Input
                id="receiverName"
                {...register("receiverName", { required: "Receiver name is required" })}
                placeholder="Jane Smith"
              />
              {errors.receiverName && (
                <p className="text-sm text-destructive">{errors.receiverName.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="receiverEmail">Email</Label>
              <Input
                id="receiverEmail"
                type="email"
                {...register("receiverEmail")}
                placeholder="jane@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="receiverPhone">Phone</Label>
              <Input
                id="receiverPhone"
                {...register("receiverPhone")}
                placeholder="+44 20 7946 0958"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="receiverAddress">Address *</Label>
              <Input
                id="receiverAddress"
                {...register("receiverAddress", { required: "Address is required" })}
                placeholder="456 High St"
              />
              {errors.receiverAddress && (
                <p className="text-sm text-destructive">{errors.receiverAddress.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="receiverCity">City *</Label>
              <Input
                id="receiverCity"
                {...register("receiverCity", { required: "City is required" })}
                placeholder="London"
              />
              {errors.receiverCity && (
                <p className="text-sm text-destructive">{errors.receiverCity.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="receiverCountry">Country *</Label>
              <Input
                id="receiverCountry"
                {...register("receiverCountry", { required: "Country is required" })}
                placeholder="United Kingdom"
              />
              {errors.receiverCountry && (
                <p className="text-sm text-destructive">{errors.receiverCountry.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Package Details */}
      <Card>
        <CardHeader>
          <CardTitle>Package Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="col-span-full grid gap-2">
              <Label htmlFor="packageDescription">Description</Label>
              <Textarea
                id="packageDescription"
                {...register("packageDescription")}
                placeholder="Describe the package contents..."
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="weight">Weight</Label>
              <div className="flex gap-2">
                <Input
                  id="weight"
                  type="number"
                  step="0.01"
                  {...register("weight")}
                  placeholder="0.00"
                  className="flex-1"
                />
                <Select
                  value={watchedWeightUnit}
                  onValueChange={(val) => setValue("weightUnit", val)}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input
                id="dimensions"
                {...register("dimensions")}
                placeholder="L x W x H (cm)"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Options */}
      <Card>
        <CardHeader>
          <CardTitle>Service Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Service Type *</Label>
              <Select
                value={watchedServiceType}
                onValueChange={(val) => setValue("serviceType", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Shipment Mode *</Label>
              <Select
                value={watchedShipmentMode}
                onValueChange={(val) => setValue("shipmentMode", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  {shipmentModes.map((mode) => (
                    <SelectItem key={mode.value} value={mode.value}>
                      {mode.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dates */}
      <Card>
        <CardHeader>
          <CardTitle>Dates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="shipDate">Ship Date</Label>
              <Input
                id="shipDate"
                type="date"
                {...register("shipDate")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
              <Input
                id="estimatedDelivery"
                type="date"
                {...register("estimatedDelivery")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status (edit mode only) */}
      {mode === "edit" && (
        <Card>
          <CardHeader>
            <CardTitle>Shipment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 max-w-sm">
              <Label>Status</Label>
              <Select
                value={watchedStatus}
                onValueChange={(val) => setValue("status", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {shipmentStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      <Separator />

      <div className="flex items-center gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-orange-500 text-white hover:bg-orange-600"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {mode === "create" ? "Creating..." : "Updating..."}
            </>
          ) : mode === "create" ? (
            "Create Shipment"
          ) : (
            "Update Shipment"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
