import { Mail, Phone, Clock } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export default function TopBar() {
  return (
    <div className="hidden bg-slate-900 text-white md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="flex items-center gap-2 text-xs text-slate-300 transition-colors hover:text-white"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>{COMPANY_INFO.email}</span>
          </a>
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="flex items-center gap-2 text-xs text-slate-300 transition-colors hover:text-white"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>{COMPANY_INFO.phone}</span>
          </a>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Clock className="h-3.5 w-3.5" />
          <span>{COMPANY_INFO.hours}</span>
        </div>
      </div>
    </div>
  );
}
