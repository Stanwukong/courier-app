"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_IMAGES } from "@/lib/images";

const slides = [
  {
    headline: "Global Logistics Solutions",
    subtitle:
      "Delivering excellence worldwide with reliable courier and freight services",
    cta: { label: "Get Started", href: "/contact" },
    gradient: "bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800",
    image: HERO_IMAGES.globalLogistics,
  },
  {
    headline: "Fast & Secure Delivery",
    subtitle:
      "Your packages, our priority. Track shipments in real-time",
    cta: { label: "Track Shipment", href: "#track" },
    gradient: "bg-gradient-to-r from-slate-800 via-slate-900 to-blue-900",
    image: HERO_IMAGES.deliveryTruck,
  },
  {
    headline: "10+ Years of Excellence",
    subtitle:
      "Trusted by businesses worldwide for freight forwarding and logistics",
    cta: { label: "Learn More", href: "/about" },
    gradient: "bg-gradient-to-r from-blue-900 via-slate-800 to-slate-900",
    image: HERO_IMAGES.shippingContainers,
  },
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative min-w-0 flex-[0_0_100%]"
            >
              <div
                className={`${slide.gradient} relative flex h-[500px] items-center justify-center md:h-[600px]`}
              >
                <Image
                  src={slide.image}
                  alt={slide.headline}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/50" />

                <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
                  <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                    {slide.headline}
                  </h1>
                  <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-200 md:text-xl">
                    {slide.subtitle}
                  </p>
                  <div className="mt-8">
                    <Button
                      asChild
                      className="h-12 rounded-md bg-orange-500 px-8 text-base font-semibold text-white hover:bg-orange-600"
                    >
                      <Link href={slide.cta.href}>{slide.cta.label}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/40"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/40"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-3 w-3 rounded-full transition-colors ${
              index === selectedIndex
                ? "bg-orange-500"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
