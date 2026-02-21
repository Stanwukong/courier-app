import type { Metadata } from "next";
import Link from "next/link";
import {
  Warehouse,
  Truck,
  Link2,
  Package,
  MapPin,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import PageBanner from "@/components/shared/page-banner";
import { BANNER_IMAGES } from "@/lib/images";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import IconCard from "@/components/shared/icon-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Logistics Services",
};

const logisticsServices = [
  {
    icon: Warehouse,
    title: "Warehousing",
    description:
      "State-of-the-art warehouse facilities with climate control, security systems, and advanced inventory management for safe and efficient storage.",
  },
  {
    icon: Truck,
    title: "Distribution",
    description:
      "Nationwide distribution networks that ensure your products reach retailers, wholesalers, and end customers quickly and cost-effectively.",
  },
  {
    icon: Link2,
    title: "Supply Chain Management",
    description:
      "End-to-end supply chain visibility and coordination that optimizes every link from procurement through production to final delivery.",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description:
      "Real-time inventory tracking and management systems that minimize stockouts, reduce carrying costs, and improve order fulfillment accuracy.",
  },
  {
    icon: MapPin,
    title: "Last Mile Delivery",
    description:
      "Reliable last mile delivery solutions that ensure your packages reach the final destination on time with proof of delivery and customer notifications.",
  },
  {
    icon: RotateCcw,
    title: "Reverse Logistics",
    description:
      "Efficient returns processing and reverse supply chain management that recovers value, reduces waste, and improves customer satisfaction.",
  },
];

export default function LogisticsPage() {
  return (
    <>
      <PageBanner
        title="Logistics Services"
        subtitle="End-to-end logistics solutions to power your supply chain"
        breadcrumbs={[{ label: "Logistics" }]}
        backgroundImage={BANNER_IMAGES.warehouse}
      />

      {/* Intro Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-slate-600 leading-relaxed">
              In today&apos;s fast-paced global marketplace, an efficient and
              resilient supply chain is the backbone of every successful
              business. Our comprehensive logistics services are designed to
              streamline your operations from warehouse to doorstep, providing
              the visibility, flexibility, and reliability you need to stay ahead
              of the competition.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-slate-50">
        <Container>
          <SectionHeading
            title="Our Logistics Solutions"
            subtitle="A full spectrum of logistics services to meet your operational needs"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {logisticsServices.map((service) => (
              <IconCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Ready to Optimize Your Supply Chain?
            </h2>
            <p className="mt-4 text-slate-300 max-w-xl mx-auto">
              Contact our logistics team to discuss how we can help streamline
              your operations, reduce costs, and improve delivery performance
              across your entire supply chain.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
