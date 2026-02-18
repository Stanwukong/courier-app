import type { Metadata } from "next";
import PageBanner from "@/components/shared/page-banner";
import Container from "@/components/shared/container";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { MapEmbed } from "@/components/contact/map-embed";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form - takes 3 columns */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Get In Touch
              </h2>
              <p className="text-slate-600 mb-8">
                Have a question or need a quote? Fill out the form below and our
                team will get back to you within 24 hours.
              </p>
              <ContactForm />
            </div>

            {/* Contact Info + Map - takes 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              <ContactInfo />
              <MapEmbed />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
