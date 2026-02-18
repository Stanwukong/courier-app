"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/lib/constants";

interface NavbarClientProps {
  links: NavLink[];
}

export default function NavbarClient({ links }: NavbarClientProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {links.map((link) => {
        if (link.children && link.children.length > 0) {
          return (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                className={cn(
                  "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-orange-500"
                    : "text-slate-700 hover:text-orange-500"
                )}
              >
                {link.label}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    openDropdown === link.label && "rotate-180"
                  )}
                />
              </button>
              {openDropdown === link.label && (
                <div className="absolute left-0 top-full z-50 min-w-[200px] rounded-md border border-slate-100 bg-white py-2 shadow-lg">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "block px-4 py-2 text-sm transition-colors",
                        isActive(child.href)
                          ? "bg-orange-50 text-orange-500"
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
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive(link.href)
                ? "text-orange-500"
                : "text-slate-700 hover:text-orange-500"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
