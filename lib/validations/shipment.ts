import { z } from "zod";

export const CreateShipmentSchema = z.object({
  senderName: z.string().min(1, "Sender name is required"),
  senderEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  senderPhone: z.string().optional().or(z.literal("")),
  senderAddress: z.string().min(1, "Sender address is required"),
  senderCity: z.string().min(1, "Sender city is required"),
  senderCountry: z.string().min(1, "Sender country is required"),
  receiverName: z.string().min(1, "Receiver name is required"),
  receiverEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  receiverPhone: z.string().optional().or(z.literal("")),
  receiverAddress: z.string().min(1, "Receiver address is required"),
  receiverCity: z.string().min(1, "Receiver city is required"),
  receiverCountry: z.string().min(1, "Receiver country is required"),
  packageDescription: z.string().optional().or(z.literal("")),
  weight: z.coerce.number().positive("Weight must be positive").optional(),
  weightUnit: z.string().default("kg"),
  dimensions: z.string().optional().or(z.literal("")),
  serviceType: z.enum([
    "AIR_FREIGHT",
    "OCEAN_FREIGHT",
    "ROAD_FREIGHT",
    "EXPRESS_COURIER",
    "SOC_MOVEMENT",
  ]),
  shipmentMode: z.enum(["INTERNATIONAL", "DOMESTIC"]),
  shipDate: z.string().optional().or(z.literal("")),
  estimatedDelivery: z.string().optional().or(z.literal("")),
});

export const UpdateShipmentSchema = z.object({
  senderName: z.string().min(1, "Sender name is required").optional(),
  senderEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  senderPhone: z.string().optional().or(z.literal("")),
  senderAddress: z.string().min(1, "Sender address is required").optional(),
  senderCity: z.string().min(1, "Sender city is required").optional(),
  senderCountry: z.string().min(1, "Sender country is required").optional(),
  receiverName: z.string().min(1, "Receiver name is required").optional(),
  receiverEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  receiverPhone: z.string().optional().or(z.literal("")),
  receiverAddress: z.string().min(1, "Receiver address is required").optional(),
  receiverCity: z.string().min(1, "Receiver city is required").optional(),
  receiverCountry: z.string().min(1, "Receiver country is required").optional(),
  packageDescription: z.string().optional().or(z.literal("")),
  weight: z.coerce.number().positive("Weight must be positive").optional(),
  weightUnit: z.string().optional(),
  dimensions: z.string().optional().or(z.literal("")),
  serviceType: z
    .enum([
      "AIR_FREIGHT",
      "OCEAN_FREIGHT",
      "ROAD_FREIGHT",
      "EXPRESS_COURIER",
      "SOC_MOVEMENT",
    ])
    .optional(),
  shipmentMode: z.enum(["INTERNATIONAL", "DOMESTIC"]).optional(),
  status: z
    .enum([
      "PENDING",
      "PICKED_UP",
      "IN_TRANSIT",
      "IN_CUSTOMS",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "RETURNED",
      "ON_HOLD",
    ])
    .optional(),
  shipDate: z.string().optional().or(z.literal("")),
  estimatedDelivery: z.string().optional().or(z.literal("")),
  actualDelivery: z.string().optional().or(z.literal("")),
});

export type CreateShipmentInput = z.infer<typeof CreateShipmentSchema>;
export type UpdateShipmentInput = z.infer<typeof UpdateShipmentSchema>;
