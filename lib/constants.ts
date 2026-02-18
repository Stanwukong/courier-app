export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "International Freight", href: "/services/international-freight" },
      { label: "Domestic Freight", href: "/services/domestic-freight" },
      { label: "Freight Forwarding", href: "/services/freight-forwarding" },
      { label: "Consultation", href: "/services/consultation" },
    ],
  },
  {
    label: "Movers",
    href: "/movers",
    children: [
      { label: "Household Goods", href: "/movers/household-goods" },
      { label: "Commercial Goods", href: "/movers/commercial-goods" },
    ],
  },
  {
    label: "Freight",
    href: "/freight",
    children: [
      { label: "Air Freight", href: "/freight/air-freight" },
      { label: "Ocean Freight", href: "/freight/ocean-freight" },
      { label: "Road Freight", href: "/freight/road-freight" },
      { label: "SOC Movements", href: "/freight/soc-movements" },
    ],
  },
  {
    label: "Customs",
    href: "/customs",
    children: [
      { label: "Export/Import", href: "/customs/export-import" },
      { label: "Importer's Representative", href: "/customs/importers-representative" },
    ],
  },
  { label: "Logistics", href: "/logistics" },
  { label: "Contact Us", href: "/contact" },
];

export const COMPANY_INFO = {
  name: "SwiftShip Logistics",
  tagline: "Your Trusted Courier & Transport Logistics Partner",
  phone: "+1 (555) 123-4567",
  email: "info@swiftshiplogistics.com",
  address: "123 Logistics Avenue, Suite 400, New York, NY 10001",
  hours: "Mon - Fri: 7:00 AM - 6:00 PM",
  yearsExperience: 10,
} as const;
