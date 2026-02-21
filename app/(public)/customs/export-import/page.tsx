import type { Metadata } from "next";
import { FileText, Tag, DollarSign, ShieldCheck } from "lucide-react";
import { ServicePageLayout } from "@/components/services/service-page-layout";
import { BANNER_IMAGES, SERVICE_DETAIL_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Export & Import Services",
};

export default function ExportImportPage() {
  return (
    <ServicePageLayout
      title="Export & Import Services"
      image={SERVICE_DETAIL_IMAGES.exportImport}
      bannerImage={BANNER_IMAGES.default}
      breadcrumbs={[
        { label: "Customs", href: "/customs" },
        { label: "Export & Import" },
      ]}
      description={`Navigating customs clearance can be one of the most complex and time-consuming aspects of international trade. Our export and import services take the burden off your shoulders by managing the entire customs process, ensuring your goods clear borders efficiently and in full compliance with all applicable regulations.

Our licensed customs brokers prepare and submit all required documentation, including customs declarations, certificates of origin, and commercial invoices. We work closely with customs authorities to expedite clearance and resolve any queries or holds that may arise during the process.

Beyond basic clearance, we provide strategic advice on tariff classification, duty optimization, and trade agreement utilization to help you minimize costs and avoid penalties. Our proactive approach to regulatory changes keeps your business ahead of evolving compliance requirements.`}
      features={[
        {
          icon: FileText,
          title: "Documentation",
          description:
            "Complete preparation and submission of all customs documents including declarations, licenses, permits, and certificates required for clearance.",
        },
        {
          icon: Tag,
          title: "Tariff Classification",
          description:
            "Accurate HS code classification to ensure correct duty rates are applied and to avoid costly reclassification penalties and delays.",
        },
        {
          icon: DollarSign,
          title: "Duty Optimization",
          description:
            "Strategic use of trade agreements, preferential tariffs, and duty relief programs to minimize your customs costs legally and effectively.",
        },
        {
          icon: ShieldCheck,
          title: "Compliance",
          description:
            "Full regulatory compliance management including restricted goods screening, sanctions checks, and ongoing audit support.",
        },
      ]}
      relatedServices={[
        { title: "Importer's Representative", href: "/customs/importers-representative" },
        { title: "International Freight", href: "/services/international-freight" },
        { title: "Consultation", href: "/services/consultation" },
      ]}
    />
  );
}
