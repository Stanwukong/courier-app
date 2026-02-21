import type { Metadata } from "next";
import { Container as ContainerIcon, Warehouse, FileText, Link2 } from "lucide-react";
import { ServicePageLayout } from "@/components/services/service-page-layout";
import { BANNER_IMAGES, SERVICE_DETAIL_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Freight Forwarding",
};

export default function FreightForwardingPage() {
  return (
    <ServicePageLayout
      title="Freight Forwarding"
      image={SERVICE_DETAIL_IMAGES.freightForwarding}
      bannerImage={BANNER_IMAGES.default}
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "Freight Forwarding" },
      ]}
      description={`Our freight forwarding service acts as the central coordinator for your entire supply chain, managing the movement of goods from origin to destination across multiple transport modes. We take the complexity out of logistics so you can focus on growing your business.

From selecting the optimal shipping routes and carriers to handling all required documentation and regulatory compliance, our freight forwarding team manages every detail. We leverage our extensive carrier relationships to secure the best rates while maintaining the highest service standards.

Our integrated approach combines air, ocean, and road transport with warehousing and distribution services, providing a seamless end-to-end solution. Advanced technology platforms give you real-time visibility into every shipment, while our experienced coordinators are always available to address any challenges that arise.`}
      features={[
        {
          icon: ContainerIcon,
          title: "Multi-modal Transport",
          description:
            "Seamless coordination across air, sea, and land transport modes to find the most efficient and cost-effective route for your cargo.",
        },
        {
          icon: Warehouse,
          title: "Warehousing",
          description:
            "Strategically located warehouse facilities for short-term and long-term storage, with inventory management and order fulfillment capabilities.",
        },
        {
          icon: FileText,
          title: "Documentation",
          description:
            "Complete management of all shipping documents including bills of lading, commercial invoices, and certificates of origin.",
        },
        {
          icon: Link2,
          title: "Supply Chain Integration",
          description:
            "End-to-end supply chain visibility and coordination that connects every link in your logistics chain for maximum efficiency.",
        },
      ]}
      relatedServices={[
        { title: "International Freight", href: "/services/international-freight" },
        { title: "Air Freight", href: "/freight/air-freight" },
        { title: "Ocean Freight", href: "/freight/ocean-freight" },
      ]}
    />
  );
}
