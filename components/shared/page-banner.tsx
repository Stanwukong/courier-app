import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  backgroundImage?: string;
}

export default function PageBanner({
  title,
  subtitle,
  breadcrumbs,
  backgroundImage,
}: PageBannerProps) {
  return (
    <section className={`${backgroundImage ? 'relative overflow-hidden' : 'bg-gradient-to-r from-slate-900 to-slate-800'} py-16 md:py-20`}>
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-3xl font-bold text-white md:text-4xl">{title}</h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-lg text-slate-300">{subtitle}</p>
        )}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mt-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                    {isLast || !crumb.href ? (
                      <span className="text-orange-400">{crumb.label}</span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="text-slate-400 transition-colors hover:text-white"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
      </div>
    </section>
  );
}
