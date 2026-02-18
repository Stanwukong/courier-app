import type {
  Shipment as PrismaShipment,
  TrackingEvent as PrismaTrackingEvent,
  ContactSubmission as PrismaContactSubmission,
  ShipmentStatus as PrismaShipmentStatus,
  ServiceType as PrismaServiceType,
  ShipmentMode as PrismaShipmentMode,
} from "@/app/generated/prisma/client";

export type Shipment = PrismaShipment;
export type TrackingEvent = PrismaTrackingEvent;
export type ContactSubmission = PrismaContactSubmission;
export type ShipmentStatus = PrismaShipmentStatus;
export type ServiceType = PrismaServiceType;
export type ShipmentMode = PrismaShipmentMode;

export type ShipmentWithEvents = Shipment & {
  trackingEvents: TrackingEvent[];
};

export type TrackingResult = {
  trackingNumber: string;
  status: ShipmentStatus;
  senderCity: string;
  senderCountry: string;
  receiverCity: string;
  receiverCountry: string;
  serviceType: ServiceType;
  shipmentMode: ShipmentMode;
  shipDate: Date | null;
  estimatedDelivery: Date | null;
  actualDelivery: Date | null;
  trackingEvents: {
    id: string;
    location: string;
    status: string;
    description: string | null;
    timestamp: Date;
  }[];
};

export type DashboardStats = {
  totalShipments: number;
  pendingShipments: number;
  inTransitShipments: number;
  deliveredShipments: number;
  totalContacts: number;
  unreadContacts: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
