import Link from "next/link";
import { COMPANY_INFO } from "@/lib/constants";

const footerColumns = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Logistics", href: "/logistics" },
    ],
  },
  {
    title: "Our Services",
    links: [
      { label: "International Freight", href: "/services/international-freight" },
      { label: "Domestic Freight", href: "/services/domestic-freight" },
      { label: "Freight Forwarding", href: "/services/freight-forwarding" },
      { label: "Consultation", href: "/services/consultation" },
    ],
  },
  {
    title: "Freight Options",
    links: [
      { label: "Air Freight", href: "/freight/air-freight" },
      { label: "Ocean Freight", href: "/freight/ocean-freight" },
      { label: "Road Freight", href: "/freight/road-freight" },
      { label: "SOC Movements", href: "/freight/soc-movements" },
    ],
  },
  {
    title: "Movers & Customs",
    links: [
      { label: "Household Goods", href: "/movers/household-goods" },
      { label: "Commercial Goods", href: "/movers/commercial-goods" },
      { label: "Export & Import", href: "/customs/export-import" },
      { label: "Importer's Rep", href: "/customs/importers-representative" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Top Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-1">
              <span className="text-xl font-bold text-white">SwiftShip</span>
              <span className="text-xl font-bold text-orange-500">
                Logistics
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Your trusted partner for courier, freight forwarding, and
              transport logistics. We deliver reliability and speed to every
              shipment, anywhere in the world.
            </p>
          </div>

          {/* Footer Columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-orange-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
