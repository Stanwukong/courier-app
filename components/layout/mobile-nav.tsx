"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] overflow-y-auto p-0">
          <SheetHeader className="border-b border-slate-100 px-4 py-4">
            <SheetTitle asChild>
              <Link
                href="/"
                onClick={handleLinkClick}
                className="flex items-center gap-1"
              >
                <span className="text-xl font-bold text-slate-900">
                  SwiftShip
                </span>
                <span className="text-xl font-bold text-orange-500">
                  Logistics
                </span>
              </Link>
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col px-2 py-4">
            {NAV_LINKS.map((link) => {
              if (link.children && link.children.length > 0) {
                const isExpanded = expandedItems.includes(link.label);
                return (
                  <div key={link.label}>
                    <button
                      type="button"
                      onClick={() => toggleExpanded(link.label)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive(link.href)
                          ? "text-orange-500"
                          : "text-slate-700 hover:bg-slate-50 hover:text-orange-500"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </button>
                    {isExpanded && (
                      <div className="ml-4 flex flex-col border-l border-slate-200 pl-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={handleLinkClick}
                            className={cn(
                              "rounded-md px-3 py-2 text-sm transition-colors",
                              isActive(child.href)
                                ? "text-orange-500"
                                : "text-slate-600 hover:bg-slate-50 hover:text-orange-500"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "text-orange-500"
                      : "text-slate-700 hover:bg-slate-50 hover:text-orange-500"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-4 border-t border-slate-100 px-3 pt-4">
              <Link
                href="/track"
                onClick={handleLinkClick}
                className="flex w-full items-center justify-center rounded-md bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600"
              >
                Track Shipment
              </Link>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
