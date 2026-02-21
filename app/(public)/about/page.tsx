import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye, Award, Clock, Users, ThumbsUp } from "lucide-react";
import PageBanner from "@/components/shared/page-banner";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import IconCard from "@/components/shared/icon-card";
import { COMPANY_INFO } from "@/lib/constants";
import { BANNER_IMAGES, ABOUT_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
};

const teamMembers = [
  { name: "James Mitchell", role: "Chief Executive Officer", image: ABOUT_IMAGES.team.jamesMitchell },
  { name: "Sarah Okonkwo", role: "Operations Director", image: ABOUT_IMAGES.team.sarahOkonkwo },
  { name: "David Chen", role: "Logistics Manager", image: ABOUT_IMAGES.team.davidChen },
  { name: "Maria Rodriguez", role: "Customer Relations", image: ABOUT_IMAGES.team.mariaRodriguez },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="About Us"
        breadcrumbs={[
          { label: "About Us" },
        ]}
        backgroundImage={BANNER_IMAGES.warehouse}
      />

      {/* Company Story */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 overflow-hidden rounded-xl">
              <Image src={ABOUT_IMAGES.ourStory} alt="Our logistics operations" fill className="object-cover" />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Our Story
              </h2>
              <div className="h-1 w-16 rounded bg-orange-500" />
              <p className="text-slate-600 leading-relaxed">
                Founded over {COMPANY_INFO.yearsExperience} years ago, {COMPANY_INFO.name} began with a simple mission: to provide reliable, efficient, and affordable logistics solutions to businesses of all sizes. What started as a small courier operation has grown into a comprehensive freight and logistics company serving clients across the globe.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our journey has been defined by a relentless commitment to customer satisfaction and operational excellence. Through strategic investments in technology, infrastructure, and our people, we have built a network that spans continents and delivers results.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Today, we offer a full suite of services including international and domestic freight, customs clearance, warehousing, and supply chain consulting. Our team of experienced professionals works around the clock to ensure your shipments arrive on time, every time.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-slate-50">
        <Container>
          <SectionHeading
            title="Mission & Vision"
            subtitle="The principles that guide everything we do"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                <Target className="size-7" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                Our Mission
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                To deliver world-class courier and logistics solutions that empower businesses to grow without borders. We strive to simplify global trade through innovative technology, transparent processes, and an unwavering dedication to service quality.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                <Eye className="size-7" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                Our Vision
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                To be the most trusted and innovative logistics partner in the industry, recognized for our ability to connect people and businesses across the world. We envision a future where seamless supply chains drive economic growth and opportunity for everyone.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            title="Our Team"
            subtitle="Meet the people behind our success"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-4 size-28 overflow-hidden rounded-full">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {member.name}
                </h3>
                <p className="text-sm text-slate-600">{member.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-slate-50">
        <Container>
          <SectionHeading
            title="Why Choose Us"
            subtitle="What sets us apart from the competition"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <IconCard
              icon={Award}
              title="Industry Expertise"
              description="Over a decade of experience in international logistics and freight management, delivering proven results for thousands of clients."
            />
            <IconCard
              icon={Clock}
              title="On-Time Delivery"
              description="Our commitment to punctuality means your shipments arrive when promised. We maintain a 98% on-time delivery rate across all services."
            />
            <IconCard
              icon={Users}
              title="Dedicated Support"
              description="A team of logistics professionals available to assist you at every step, providing personalized solutions and real-time updates."
            />
            <IconCard
              icon={ThumbsUp}
              title="Customer Satisfaction"
              description="We pride ourselves on building long-term relationships with our clients through transparent communication and consistent service quality."
            />
          </div>
        </Container>
      </section>
    </>
  );
}
