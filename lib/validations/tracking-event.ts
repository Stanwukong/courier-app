import { z } from "zod";

export const CreateTrackingEventSchema = z.object({
  shipmentId: z.string().min(1, "Shipment ID is required"),
  location: z.string().min(1, "Location is required"),
  status: z.string().min(1, "Status is required"),
  description: z.string().optional().or(z.literal("")),
  timestamp: z.string().optional().or(z.literal("")),
});

export type CreateTrackingEventInput = z.infer<typeof CreateTrackingEventSchema>;
