import type { Metadata } from "next";
import { Zap, MapPin, Radio, DollarSign } from "lucide-react";
import { ServicePageLayout } from "@/components/services/service-page-layout";

export const metadata: Metadata = {
  title: "Domestic Freight",
};

export default function DomesticFreightPage() {
  return (
    <ServicePageLayout
      title="Domestic Freight"
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "Domestic Freight" },
      ]}
      description={`Our domestic freight service delivers fast, reliable transportation across the country. Whether you need same-day courier delivery for urgent documents or full truckload shipping for large consignments, we have the capacity and expertise to get it done.

We operate an extensive fleet of vehicles ranging from small vans to heavy-duty trucks, supported by a network of strategically located distribution hubs. This infrastructure allows us to offer flexible delivery windows, including next-day and time-critical express options for businesses that cannot afford delays.

Every domestic shipment is tracked in real time through our digital platform, giving you complete visibility from pickup to delivery. Our dedicated account managers work closely with you to optimize routes, consolidate shipments, and reduce your overall transportation costs.`}
      features={[
        {
          icon: Zap,
          title: "Next-Day Delivery",
          description:
            "Guaranteed next-day delivery options for time-sensitive shipments, with express same-day service available in major metropolitan areas.",
        },
        {
          icon: MapPin,
          title: "Nationwide Coverage",
          description:
            "Comprehensive coverage across all regions with strategically placed hubs ensuring efficient delivery to even the most remote locations.",
        },
        {
          icon: Radio,
          title: "Real-time Tracking",
          description:
            "Advanced GPS-enabled tracking provides live updates on your shipment status, with automated notifications at key milestones.",
        },
        {
          icon: DollarSign,
          title: "Competitive Rates",
          description:
            "Volume-based pricing and route optimization help keep your shipping costs low without compromising on speed or reliability.",
        },
      ]}
      relatedServices={[
        { title: "International Freight", href: "/services/international-freight" },
        { title: "Road Freight", href: "/freight/road-freight" },
        { title: "Consultation", href: "/services/consultation" },
      ]}
    />
  );
}
