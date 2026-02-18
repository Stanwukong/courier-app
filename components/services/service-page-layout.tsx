import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import PageBanner from "@/components/shared/page-banner";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface RelatedService {
  title: string;
  href: string;
}

interface ServicePageLayoutProps {
  title: string;
  description: string;
  features: Feature[];
  breadcrumbs: { label: string; href?: string }[];
  relatedServices?: RelatedService[];
}

export function ServicePageLayout({
  title,
  description,
  features,
  breadcrumbs,
  relatedServices,
}: ServicePageLayoutProps) {
  const paragraphs = description.split("\n\n");

  return (
    <>
      <PageBanner title={title} breadcrumbs={breadcrumbs} />

      {/* Description Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="h-80 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300" />
            <div className="space-y-4">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-slate-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-slate-50">
        <Container>
          <SectionHeading title="Key Features" subtitle={`What makes our ${title.toLowerCase()} service stand out`} centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"
                >
                  <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                    <Icon className="size-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Related Services */}
      {relatedServices && relatedServices.length > 0 && (
        <section className="py-16 bg-white">
          <Container>
            <SectionHeading title="Related Services" centered />
            <div className="flex flex-wrap justify-center gap-4">
              {relatedServices.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-orange-300 hover:text-orange-600 hover:shadow-md"
                >
                  {service.title}
                  <ArrowRight className="size-4" />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-slate-900">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Need this service?
            </h2>
            <p className="mt-4 text-slate-300 max-w-xl mx-auto">
              Get in touch with our team to discuss your {title.toLowerCase()} requirements. We offer tailored solutions to meet your unique logistics needs.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Link href="/contact">
                  Contact Us
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
