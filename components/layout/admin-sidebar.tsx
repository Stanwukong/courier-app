"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, MessageSquare, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const adminLinks = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Shipments",
    href: "/admin/shipments",
    icon: Package,
  },
  {
    label: "Contacts",
    href: "/admin/contacts",
    icon: MessageSquare,
  },
];

function SidebarContent() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex flex-col gap-1 px-3 py-4">
      {adminLinks.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
              isActive(link.href)
                ? "bg-orange-50 text-orange-600"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <Icon className="h-5 w-5" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminSidebarTrigger() {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Open admin menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[260px] p-0">
          <SheetHeader className="border-b border-slate-100 px-4 py-4">
            <SheetTitle asChild>
              <span className="flex items-center gap-1">
                <span className="text-lg font-bold text-slate-900">
                  SwiftShip
                </span>
                <span className="text-lg font-bold text-orange-500">
                  Admin
                </span>
              </span>
            </SheetTitle>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default function AdminSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-16 items-center border-b border-slate-100 px-6">
        <Link href="/admin" className="flex items-center gap-1">
          <span className="text-lg font-bold text-slate-900">SwiftShip</span>
          <span className="text-lg font-bold text-orange-500">Admin</span>
        </Link>
      </div>
      <SidebarContent />
    </aside>
  );
}
