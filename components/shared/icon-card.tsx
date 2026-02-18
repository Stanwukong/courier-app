import Link from "next/link";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface IconCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
}

export default function IconCard({
  icon: Icon,
  title,
  description,
  href,
}: IconCardProps) {
  const content = (
    <div
      className={cn(
        "flex flex-col items-center rounded-lg border border-slate-100 bg-white p-6 text-center shadow-sm transition-shadow duration-300",
        href && "hover:shadow-md"
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
        <Icon className="h-7 w-7 text-orange-500" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
