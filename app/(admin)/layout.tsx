import { auth } from "@/lib/auth";
import AdminSidebar from "@/components/layout/admin-sidebar";
import AdminHeader from "@/components/layout/admin-header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // If no session, render children without chrome (for login page)
  // Middleware handles redirecting unauthenticated users from non-login admin pages
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader userName={session.user?.name} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
