import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageBanner from "@/components/shared/page-banner";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";

export const metadata: Metadata = {
  title: "Our Services",
};

const services = [
  {
    title: "International Freight",
    href: "/services/international-freight",
    description:
      "Seamless worldwide shipping solutions connecting your business to markets across the globe with reliable transit times and full customs support.",
  },
  {
    title: "Domestic Freight",
    href: "/services/domestic-freight",
    description:
      "Fast and dependable local and national delivery services with next-day options, real-time tracking, and competitive pricing for businesses of all sizes.",
  },
  {
    title: "Freight Forwarding",
    href: "/services/freight-forwarding",
    description:
      "End-to-end freight forwarding that coordinates multi-modal transport, warehousing, and documentation to streamline your supply chain operations.",
  },
  {
    title: "Consultation",
    href: "/services/consultation",
    description:
      "Expert logistics consulting services that help you optimize supply chains, reduce costs, and ensure regulatory compliance across all markets.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        title="Our Services"
        subtitle="Comprehensive logistics solutions tailored to your business needs"
        breadcrumbs={[{ label: "Services" }]}
      />

      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            title="What We Offer"
            subtitle="From international shipping to expert consultation, we provide a full range of logistics services"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group block"
              >
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all hover:shadow-lg hover:border-orange-200">
                  <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-orange-500">
                      Learn More
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
