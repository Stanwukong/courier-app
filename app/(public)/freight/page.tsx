import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageBanner from "@/components/shared/page-banner";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";

export const metadata: Metadata = {
  title: "Freight Services",
};

const freightServices = [
  {
    title: "Air Freight",
    href: "/freight/air-freight",
    description:
      "Fast and reliable air cargo solutions for time-sensitive shipments, with express and charter options available worldwide.",
  },
  {
    title: "Ocean Freight",
    href: "/freight/ocean-freight",
    description:
      "Cost-effective sea freight services for bulk and containerized cargo, offering both full container and less-than-container load options.",
  },
  {
    title: "Road Freight",
    href: "/freight/road-freight",
    description:
      "Flexible ground transportation solutions for domestic and cross-border shipments, with full and partial load capabilities.",
  },
  {
    title: "SOC Movements",
    href: "/freight/soc-movements",
    description:
      "Specialized management of shipper-owned containers, including depot services, repositioning, and maintenance coordination.",
  },
];

export default function FreightPage() {
  return (
    <>
      <PageBanner
        title="Freight Services"
        subtitle="Multi-modal freight solutions across air, ocean, and road"
        breadcrumbs={[{ label: "Freight" }]}
      />

      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            title="Our Freight Solutions"
            subtitle="Choose the right transport mode for your cargo with our comprehensive freight services"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {freightServices.map((service) => (
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
