import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageBanner from "@/components/shared/page-banner";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { BANNER_IMAGES, MOVERS_CARD_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Moving Services",
};

const movingServices = [
  {
    title: "Household Goods",
    href: "/movers/household-goods",
    description:
      "Professional residential moving services that take the stress out of relocating. From careful packing and loading to safe delivery and setup, we handle every detail of your household move.",
    image: MOVERS_CARD_IMAGES.householdGoods,
  },
  {
    title: "Commercial Goods",
    href: "/movers/commercial-goods",
    description:
      "Specialized business relocation services designed to minimize downtime and disruption. We manage office moves, equipment transport, and large-scale commercial relocations with precision.",
    image: MOVERS_CARD_IMAGES.commercialGoods,
  },
];

export default function MoversPage() {
  return (
    <>
      <PageBanner
        title="Moving Services"
        subtitle="Professional moving solutions for homes and businesses"
        breadcrumbs={[{ label: "Movers" }]}
        backgroundImage={BANNER_IMAGES.truck}
      />

      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            title="Our Moving Solutions"
            subtitle="Whether you are moving your home or your business, we provide safe and efficient relocation services"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {movingServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group block"
              >
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all hover:shadow-lg hover:border-orange-200">
                  <div className="relative h-52">
                    <Image src={service.image} alt={service.title} fill className="object-cover" />
                  </div>
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
