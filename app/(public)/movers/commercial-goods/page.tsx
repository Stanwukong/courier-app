import type { Metadata } from "next";
import { Building2, Truck, Clock, ClipboardList } from "lucide-react";
import { ServicePageLayout } from "@/components/services/service-page-layout";

export const metadata: Metadata = {
  title: "Commercial Goods Moving",
};

export default function CommercialGoodsPage() {
  return (
    <ServicePageLayout
      title="Commercial Goods Moving"
      breadcrumbs={[
        { label: "Movers", href: "/movers" },
        { label: "Commercial Goods" },
      ]}
      description={`Relocating a business requires meticulous planning and flawless execution. Our commercial goods moving service is built for organizations that need to minimize downtime and maintain business continuity throughout the relocation process.

We work with businesses of all sizes, from small offices to large-scale industrial facilities. Our project management team develops a detailed relocation plan that accounts for every piece of equipment, every workstation, and every critical timeline. We coordinate with your team to schedule the move during off-peak hours or weekends to reduce operational disruption.

Our specialized equipment and trained crews handle everything from sensitive IT infrastructure and office furniture to heavy machinery and industrial equipment. We also provide secure storage solutions for businesses that need temporary warehousing during transitions between locations.`}
      features={[
        {
          icon: Building2,
          title: "Office Relocation",
          description:
            "Complete office moving solutions including workstation setup, IT equipment handling, and furniture installation at your new premises.",
        },
        {
          icon: Truck,
          title: "Equipment Transport",
          description:
            "Specialized transport for heavy machinery, industrial equipment, and sensitive electronics with proper securing and climate control.",
        },
        {
          icon: Clock,
          title: "Minimal Downtime",
          description:
            "Strategic scheduling and efficient execution to get your business back up and running in the shortest possible time frame.",
        },
        {
          icon: ClipboardList,
          title: "Project Management",
          description:
            "Dedicated project managers coordinate every aspect of your commercial move from initial planning through to final installation.",
        },
      ]}
      relatedServices={[
        { title: "Household Goods Moving", href: "/movers/household-goods" },
        { title: "Road Freight", href: "/freight/road-freight" },
      ]}
    />
  );
}
