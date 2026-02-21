import type { Metadata } from "next";
import { Handshake, Scale, FolderOpen, MessageSquare } from "lucide-react";
import { ServicePageLayout } from "@/components/services/service-page-layout";
import { BANNER_IMAGES, SERVICE_DETAIL_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Importer's Representative",
};

export default function ImportersRepresentativePage() {
  return (
    <ServicePageLayout
      title="Importer's Representative"
      image={SERVICE_DETAIL_IMAGES.importersRep}
      bannerImage={BANNER_IMAGES.default}
      breadcrumbs={[
        { label: "Customs", href: "/customs" },
        { label: "Importer's Representative" },
      ]}
      description={`When importing goods into a new market, having an authorized representative on the ground is essential. Our importer's representative service acts as your trusted liaison with customs authorities, ensuring your interests are protected and your shipments clear without unnecessary delays.

As your designated representative, we take on the legal and administrative responsibilities required by customs regulations. This includes registering with the appropriate authorities, maintaining required bonds and guarantees, and ensuring all import activities are conducted in full compliance with local laws and regulations.

Our team brings deep knowledge of local customs practices, regulatory requirements, and industry-specific import rules. We proactively monitor regulatory changes and communicate their impact on your operations, keeping you informed and prepared for any adjustments that may be needed.`}
      features={[
        {
          icon: Handshake,
          title: "Customs Liaison",
          description:
            "Direct representation with customs authorities on your behalf, managing all communications, meetings, and official correspondence.",
        },
        {
          icon: Scale,
          title: "Regulatory Compliance",
          description:
            "Ongoing monitoring and management of import compliance requirements, including licensing, permits, and regulatory reporting.",
        },
        {
          icon: FolderOpen,
          title: "Document Management",
          description:
            "Centralized management of all import-related documentation with secure archiving and retrieval for audit and compliance purposes.",
        },
        {
          icon: MessageSquare,
          title: "Dispute Resolution",
          description:
            "Professional handling of customs disputes, penalty negotiations, and appeals to protect your interests and resolve issues efficiently.",
        },
      ]}
      relatedServices={[
        { title: "Export & Import Services", href: "/customs/export-import" },
        { title: "Consultation", href: "/services/consultation" },
        { title: "Logistics", href: "/logistics" },
      ]}
    />
  );
}
