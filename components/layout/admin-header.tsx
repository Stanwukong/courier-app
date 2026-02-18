import { LogOut, User } from "lucide-react";
import { AdminSidebarTrigger } from "@/components/layout/admin-sidebar";

interface AdminHeaderProps {
  userName?: string | null;
}

export default function AdminHeader({ userName }: AdminHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Mobile sidebar trigger */}
      <AdminSidebarTrigger />

      {/* Spacer for desktop (no hamburger on desktop) */}
      <div className="hidden lg:block" />

      {/* Right side: user info + sign out */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
            <User className="h-4 w-4 text-slate-500" />
          </div>
          <span className="hidden font-medium sm:inline">
            {userName || "Admin"}
          </span>
        </div>
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </form>
      </div>
    </header>
  );
}
