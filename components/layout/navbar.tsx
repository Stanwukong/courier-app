import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import NavbarClient from "@/components/layout/navbar-client";
import MobileNav from "@/components/layout/mobile-nav";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span className="text-xl font-bold text-slate-900">SwiftShip</span>
          <span className="text-xl font-bold text-orange-500">Logistics</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <NavbarClient links={NAV_LINKS} />
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/track"
            className="hidden rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 sm:inline-flex"
          >
            Track Shipment
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
