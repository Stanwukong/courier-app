import type { Metadata } from "next";
import { Globe, FileCheck, Truck, ShieldCheck } from "lucide-react";
import { ServicePageLayout } from "@/components/services/service-page-layout";
import { BANNER_IMAGES, SERVICE_DETAIL_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "International Freight",
};

export default function InternationalFreightPage() {
  return (
    <ServicePageLayout
      title="International Freight"
      image={SERVICE_DETAIL_IMAGES.internationalFreight}
      bannerImage={BANNER_IMAGES.default}
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "International Freight" },
      ]}
      description={`Our international freight service provides comprehensive worldwide shipping solutions designed to move your goods safely and efficiently across borders. Whether you are shipping raw materials, finished products, or oversized cargo, our global network ensures your shipments reach their destination on schedule.

We handle every aspect of the international shipping process, from documentation and customs clearance to last-mile delivery. Our partnerships with leading carriers across air, ocean, and road networks give you access to competitive rates and flexible routing options tailored to your specific requirements.

With decades of experience navigating complex international trade regulations, our team ensures full compliance at every stage. We provide end-to-end visibility through advanced tracking systems, so you always know exactly where your cargo is and when it will arrive.`}
      features={[
        {
          icon: Globe,
          title: "Global Coverage",
          description:
            "Access to a worldwide network of carriers and partners spanning over 150 countries, ensuring your cargo reaches any destination.",
        },
        {
          icon: FileCheck,
          title: "Customs Support",
          description:
            "Expert customs brokerage and documentation services that streamline clearance and ensure compliance with international trade regulations.",
        },
        {
          icon: Truck,
          title: "Door-to-Door",
          description:
            "Complete door-to-door delivery service from pickup at origin to final delivery at destination, with full tracking throughout.",
        },
        {
          icon: ShieldCheck,
          title: "Cargo Insurance",
          description:
            "Comprehensive cargo insurance options to protect your shipments against loss, damage, or delay during international transit.",
        },
      ]}
      relatedServices={[
        { title: "Domestic Freight", href: "/services/domestic-freight" },
        { title: "Freight Forwarding", href: "/services/freight-forwarding" },
        { title: "Customs Services", href: "/customs" },
      ]}
    />
  );
}
