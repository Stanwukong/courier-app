import type { Metadata } from "next";
import { Truck, Globe, Navigation, CalendarClock } from "lucide-react";
import { ServicePageLayout } from "@/components/services/service-page-layout";
import { BANNER_IMAGES, SERVICE_DETAIL_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Road Freight",
};

export default function RoadFreightPage() {
  return (
    <ServicePageLayout
      title="Road Freight"
      image={SERVICE_DETAIL_IMAGES.roadFreight}
      bannerImage={BANNER_IMAGES.containers}
      breadcrumbs={[
        { label: "Freight", href: "/freight" },
        { label: "Road Freight" },
      ]}
      description={`Our road freight service provides the flexibility and reliability that ground transportation demands. With an extensive fleet and network of trusted carrier partners, we deliver full truckload and less-than-truckload solutions that keep your supply chain moving efficiently.

We serve domestic routes as well as cross-border corridors, offering seamless customs transit and border-crossing management. Our vehicles are equipped with GPS tracking and our drivers are trained to handle a wide range of cargo types, from standard palletized goods to oversized and temperature-sensitive shipments.

Route optimization technology and dedicated dispatch teams ensure your cargo takes the most efficient path to its destination. Whether you need a single delivery or a regular scheduled service, we design road freight solutions that align with your operational requirements and delivery commitments.`}
      features={[
        {
          icon: Truck,
          title: "FTL/LTL Options",
          description:
            "Full truckload and less-than-truckload services that give you the flexibility to ship any volume at the most competitive rates.",
        },
        {
          icon: Globe,
          title: "Cross-border",
          description:
            "Seamless cross-border road freight with customs documentation, border-crossing management, and multi-country transit support.",
        },
        {
          icon: Navigation,
          title: "GPS Tracking",
          description:
            "Real-time vehicle tracking with live location updates, estimated arrival times, and automated delivery confirmations.",
        },
        {
          icon: CalendarClock,
          title: "Scheduled Delivery",
          description:
            "Regular scheduled delivery services with guaranteed time windows, ideal for businesses with recurring shipping needs.",
        },
      ]}
      relatedServices={[
        { title: "Domestic Freight", href: "/services/domestic-freight" },
        { title: "Air Freight", href: "/freight/air-freight" },
        { title: "Commercial Goods Moving", href: "/movers/commercial-goods" },
      ]}
    />
  );
}
