import { Globe, Headphones, MapPin, Shield } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import IconCard from "@/components/shared/icon-card";

const features = [
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Extensive worldwide partner network covering 150+ countries",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service for all your queries",
  },
  {
    icon: MapPin,
    title: "Real-time Tracking",
    description:
      "Track your shipments in real-time from pickup to delivery",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Your cargo is fully insured and handled with utmost care",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-20">
      <Container>
        <SectionHeading
          title="Why Choose Us"
          subtitle="What sets us apart from the competition"
          centered
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <IconCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
