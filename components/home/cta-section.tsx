import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/container";

export default function CtaSection() {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-16">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ready to Ship?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-orange-100">
            Get a free quote or contact us for customized logistics solutions
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-md bg-white px-8 text-base font-semibold text-orange-600 hover:bg-orange-50"
            >
              <Link href="/contact">Get a Quote</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-md border-2 border-white bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10"
            >
              <Link href="/#track">Track Shipment</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
