import type { Metadata } from "next";
import { Zap, Plane, AlertTriangle, Thermometer } from "lucide-react";
import { ServicePageLayout } from "@/components/services/service-page-layout";
import { BANNER_IMAGES, SERVICE_DETAIL_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Air Freight",
};

export default function AirFreightPage() {
  return (
    <ServicePageLayout
      title="Air Freight"
      image={SERVICE_DETAIL_IMAGES.airFreight}
      bannerImage={BANNER_IMAGES.containers}
      breadcrumbs={[
        { label: "Freight", href: "/freight" },
        { label: "Air Freight" },
      ]}
      description={`When speed matters most, our air freight service delivers. We offer rapid, reliable air cargo solutions that connect your business to destinations worldwide, with transit times measured in hours rather than weeks. From small parcels to oversized cargo, we handle it all with precision and care.

Our extensive airline partnerships provide access to scheduled cargo flights, dedicated charter services, and consolidated shipments across all major trade routes. Whether you need next-flight-out urgency or cost-optimized deferred service, we match the right solution to your timeline and budget.

We specialize in handling complex air freight requirements including dangerous goods, perishable items, and high-value commodities. Our team manages all documentation, customs clearance, and ground handling to ensure your cargo moves seamlessly from origin to destination without delays.`}
      features={[
        {
          icon: Zap,
          title: "Express Delivery",
          description:
            "Priority handling and next-flight-out options for urgent shipments that need to arrive at their destination as quickly as possible.",
        },
        {
          icon: Plane,
          title: "Charter Services",
          description:
            "Dedicated aircraft charter solutions for oversized cargo, project logistics, or when scheduled services cannot meet your requirements.",
        },
        {
          icon: AlertTriangle,
          title: "Dangerous Goods",
          description:
            "IATA-certified handling of dangerous goods with full regulatory compliance, proper packaging, and specialized documentation.",
        },
        {
          icon: Thermometer,
          title: "Temperature Control",
          description:
            "Cold chain logistics for pharmaceuticals, perishables, and temperature-sensitive goods with end-to-end monitoring and compliance.",
        },
      ]}
      relatedServices={[
        { title: "Ocean Freight", href: "/freight/ocean-freight" },
        { title: "International Freight", href: "/services/international-freight" },
        { title: "Freight Forwarding", href: "/services/freight-forwarding" },
      ]}
    />
  );
}
