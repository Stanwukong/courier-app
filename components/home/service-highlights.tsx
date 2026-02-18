import Link from "next/link";
import { Plane, Ship, Truck, ArrowRight } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";

const services = [
  {
    icon: Plane,
    title: "Air Freight",
    description:
      "Fast and reliable air cargo solutions for time-sensitive shipments. We offer express and standard air freight services to destinations worldwide.",
    href: "/freight/air-freight",
  },
  {
    icon: Ship,
    title: "Ocean Freight",
    description:
      "Cost-effective sea transport for large-volume shipments. Full container load (FCL) and less-than-container load (LCL) options available.",
    href: "/freight/ocean-freight",
  },
  {
    icon: Truck,
    title: "Road Freight",
    description:
      "Reliable ground transportation across the region. Our extensive fleet ensures your cargo arrives safely and on schedule.",
    href: "/freight/road-freight",
  },
];

export default function ServiceHighlights() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive logistics solutions tailored to your needs"
          centered
        />

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-lg bg-white p-8 shadow transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 transition-colors group-hover:bg-orange-500">
                <service.icon className="h-8 w-8 text-orange-500 transition-colors group-hover:text-white" />
              </div>
              <h3 className="mb-3 text-center text-xl font-semibold text-slate-900">
                {service.title}
              </h3>
              <p className="mb-6 text-center text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>
              <div className="text-center">
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-orange-500 transition-colors hover:text-orange-600"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
