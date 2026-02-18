import type { Metadata } from "next";
import { Container as ContainerIcon, Warehouse, Wrench, ArrowLeftRight } from "lucide-react";
import { ServicePageLayout } from "@/components/services/service-page-layout";

export const metadata: Metadata = {
  title: "SOC Movements",
};

export default function SocMovementsPage() {
  return (
    <ServicePageLayout
      title="SOC Movements"
      breadcrumbs={[
        { label: "Freight", href: "/freight" },
        { label: "SOC Movements" },
      ]}
      description={`Managing shipper-owned containers (SOC) requires specialized expertise and a reliable logistics partner. Our SOC movements service provides end-to-end container management solutions that help you maintain control over your equipment while optimizing utilization and reducing costs.

We handle the complete lifecycle of your containers, from pickup and positioning to depot storage, maintenance, and repositioning. Our network of depot partners ensures your containers are always where you need them, ready for the next shipment, while our tracking systems provide full visibility into the location and status of every unit.

Whether you operate a small fleet or manage thousands of containers, our experienced team develops customized SOC management strategies that maximize asset utilization and minimize empty repositioning costs. We coordinate with shipping lines, ports, and inland transport providers to keep your containers moving efficiently.`}
      features={[
        {
          icon: ContainerIcon,
          title: "Container Management",
          description:
            "Comprehensive tracking and management of your entire container fleet with real-time visibility into location, status, and availability.",
        },
        {
          icon: Warehouse,
          title: "Depot Services",
          description:
            "Access to a network of secure depot facilities for container storage, with gate-in/gate-out management and inventory reporting.",
        },
        {
          icon: Wrench,
          title: "Repair & Maintenance",
          description:
            "Coordinated container inspection, repair, and maintenance services to keep your fleet in top condition and survey-ready.",
        },
        {
          icon: ArrowLeftRight,
          title: "Repositioning",
          description:
            "Strategic container repositioning services that minimize empty moves and reduce costs through optimized routing and load matching.",
        },
      ]}
      relatedServices={[
        { title: "Ocean Freight", href: "/freight/ocean-freight" },
        { title: "International Freight", href: "/services/international-freight" },
        { title: "Logistics", href: "/logistics" },
      ]}
    />
  );
}
