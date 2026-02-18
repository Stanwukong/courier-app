import type { Metadata } from "next";
import { PackageOpen, Wrench, Warehouse, ShieldCheck } from "lucide-react";
import { ServicePageLayout } from "@/components/services/service-page-layout";

export const metadata: Metadata = {
  title: "Household Goods Moving",
};

export default function HouseholdGoodsPage() {
  return (
    <ServicePageLayout
      title="Household Goods Moving"
      breadcrumbs={[
        { label: "Movers", href: "/movers" },
        { label: "Household Goods" },
      ]}
      description={`Moving your home should be an exciting chapter, not a stressful ordeal. Our household goods moving service is designed to make your residential relocation as smooth and hassle-free as possible, whether you are moving across town or across the country.

Our trained moving crews handle your belongings with the utmost care, using professional packing materials and techniques to protect everything from delicate glassware to bulky furniture. We provide a detailed inventory of all items and keep you informed at every stage of the move.

We understand that every home move is unique, which is why we offer flexible service packages that can be tailored to your specific needs and budget. From full-service packing and unpacking to furniture disassembly and reassembly, we are here to help with every aspect of your move.`}
      features={[
        {
          icon: PackageOpen,
          title: "Packing Services",
          description:
            "Professional packing and unpacking services using high-quality materials to ensure your belongings are protected throughout the entire move.",
        },
        {
          icon: Wrench,
          title: "Furniture Assembly",
          description:
            "Expert disassembly and reassembly of furniture, beds, and large appliances at both origin and destination for a complete setup.",
        },
        {
          icon: Warehouse,
          title: "Storage Solutions",
          description:
            "Secure, climate-controlled storage facilities available for short-term and long-term needs when your move-in dates do not align.",
        },
        {
          icon: ShieldCheck,
          title: "Insurance Coverage",
          description:
            "Comprehensive transit insurance that protects your household goods against damage or loss, giving you complete peace of mind.",
        },
      ]}
      relatedServices={[
        { title: "Commercial Goods Moving", href: "/movers/commercial-goods" },
        { title: "Domestic Freight", href: "/services/domestic-freight" },
      ]}
    />
  );
}
