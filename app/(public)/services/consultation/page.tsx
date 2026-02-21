import type { Metadata } from "next";
import { BarChart3, PiggyBank, Route, Scale } from "lucide-react";
import { ServicePageLayout } from "@/components/services/service-page-layout";
import { BANNER_IMAGES, SERVICE_DETAIL_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Consultation",
};

export default function ConsultationPage() {
  return (
    <ServicePageLayout
      title="Consultation"
      image={SERVICE_DETAIL_IMAGES.consultation}
      bannerImage={BANNER_IMAGES.default}
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "Consultation" },
      ]}
      description={`Our logistics consultation service provides expert guidance to help businesses optimize their supply chain operations, reduce costs, and improve overall efficiency. Whether you are launching a new product line or expanding into new markets, our consultants develop tailored strategies that deliver measurable results.

We begin with a thorough analysis of your current logistics processes, identifying bottlenecks, inefficiencies, and opportunities for improvement. Our team then develops a comprehensive plan that addresses your specific challenges while aligning with your business objectives and growth targets.

From route optimization and carrier selection to regulatory compliance and technology integration, our consultants bring deep industry expertise to every engagement. We work alongside your team to implement solutions and provide ongoing support to ensure sustained performance improvements.`}
      features={[
        {
          icon: BarChart3,
          title: "Supply Chain Analysis",
          description:
            "In-depth assessment of your entire supply chain to identify inefficiencies, risks, and opportunities for optimization and cost savings.",
        },
        {
          icon: PiggyBank,
          title: "Cost Optimization",
          description:
            "Strategic recommendations for reducing transportation, warehousing, and handling costs while maintaining or improving service levels.",
        },
        {
          icon: Route,
          title: "Route Planning",
          description:
            "Data-driven route optimization that minimizes transit times, reduces fuel costs, and improves delivery reliability across your network.",
        },
        {
          icon: Scale,
          title: "Compliance Advisory",
          description:
            "Expert guidance on international trade regulations, customs requirements, and industry standards to keep your operations fully compliant.",
        },
      ]}
      relatedServices={[
        { title: "Freight Forwarding", href: "/services/freight-forwarding" },
        { title: "Logistics", href: "/logistics" },
        { title: "Customs Services", href: "/customs" },
      ]}
    />
  );
}
