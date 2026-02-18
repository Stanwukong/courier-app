import type { Metadata } from "next";
import { Container as ContainerIcon, MapPin, Ship, Package } from "lucide-react";
import { ServicePageLayout } from "@/components/services/service-page-layout";

export const metadata: Metadata = {
  title: "Ocean Freight",
};

export default function OceanFreightPage() {
  return (
    <ServicePageLayout
      title="Ocean Freight"
      breadcrumbs={[
        { label: "Freight", href: "/freight" },
        { label: "Ocean Freight" },
      ]}
      description={`Ocean freight remains the backbone of global trade, and our sea freight service provides the reliable, cost-effective shipping solutions your business needs. We handle everything from single container shipments to large-scale project cargo, ensuring your goods travel safely across the world's oceans.

Our relationships with major shipping lines give you access to competitive rates, frequent sailing schedules, and priority space allocation on the busiest trade lanes. We offer both Full Container Load (FCL) and Less-than-Container Load (LCL) options, allowing you to choose the most economical solution based on your cargo volume.

From booking and documentation to customs clearance and last-mile delivery, our ocean freight team manages every detail of the shipping process. Real-time container tracking keeps you informed about your cargo's location and estimated arrival, while our proactive communication ensures you are always in the loop.`}
      features={[
        {
          icon: ContainerIcon,
          title: "FCL/LCL Options",
          description:
            "Flexible full container load and less-than-container load options to match your cargo volume and budget requirements.",
        },
        {
          icon: MapPin,
          title: "Container Tracking",
          description:
            "Real-time tracking of your containers throughout the voyage, with automated alerts at key milestones and port arrivals.",
        },
        {
          icon: Ship,
          title: "Port-to-Port",
          description:
            "Comprehensive port-to-port service with connections to all major global ports, supported by inland transport at both ends.",
        },
        {
          icon: Package,
          title: "Bulk Cargo",
          description:
            "Specialized handling of bulk and break-bulk cargo including heavy lift, oversized, and project freight with custom solutions.",
        },
      ]}
      relatedServices={[
        { title: "Air Freight", href: "/freight/air-freight" },
        { title: "SOC Movements", href: "/freight/soc-movements" },
        { title: "Customs Services", href: "/customs" },
      ]}
    />
  );
}
