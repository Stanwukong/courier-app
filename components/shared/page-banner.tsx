import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
}

export default function PageBanner({
  title,
  subtitle,
  breadcrumbs,
}: PageBannerProps) {
  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
