import type { Metadata } from "next";
import HeroCarousel from "@/components/home/hero-carousel";
import TrackTraceForm from "@/components/home/track-trace-form";
import ServiceHighlights from "@/components/home/service-highlights";
import WhyChooseUs from "@/components/home/why-choose-us";
import CompanyStats from "@/components/home/company-stats";
import CtaSection from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "Home | SwiftShip Logistics",
  description:
    "SwiftShip Logistics offers reliable courier, freight forwarding, and logistics services worldwide. Track shipments, get quotes, and ship with confidence.",
};

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <TrackTraceForm />
      <ServiceHighlights />
      <WhyChooseUs />
      <CompanyStats />
      <CtaSection />
    </>
  );
}
