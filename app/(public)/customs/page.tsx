import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageBanner from "@/components/shared/page-banner";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";

export const metadata: Metadata = {
  title: "Customs Services",
};

const customsServices = [
  {
    title: "Export & Import Services",
    href: "/customs/export-import",
    description:
      "Complete customs clearance solutions for both exports and imports, including documentation preparation, tariff classification, duty optimization, and full regulatory compliance.",
  },
  {
    title: "Importer's Representative",
    href: "/customs/importers-representative",
    description:
      "Authorized representation for importers, acting as your liaison with customs authorities to manage documentation, resolve disputes, and ensure ongoing regulatory compliance.",
  },
];

export default function CustomsPage() {
  return (
    <>
      <PageBanner
        title="Customs Services"
        subtitle="Expert customs clearance and compliance solutions"
        breadcrumbs={[{ label: "Customs" }]}
      />

      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            title="Customs Solutions"
            subtitle="Navigate complex customs regulations with confidence through our specialized services"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {customsServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group block"
              >
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all hover:shadow-lg hover:border-orange-200">
                  <div className="h-52 bg-gradient-to-br from-slate-200 to-slate-300" />
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
