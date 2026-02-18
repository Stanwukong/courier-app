import { prisma } from "@/lib/prisma";
import { DashboardStatsCards } from "@/components/admin/dashboard-stats-cards";
import { RecentActivity } from "@/components/admin/recent-activity";

export const metadata = {
  title: "Dashboard",
};

export default async function AdminDashboardPage() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalShipments,
    pendingShipments,
    inTransitShipments,
    deliveredShipments,
    unreadContacts,
    shipmentsThisMonth,
    recentShipments,
    recentContacts,
  ] = await Promise.all([
    prisma.shipment.count(),
    prisma.shipment.count({ where: { status: "PENDING" } }),
    prisma.shipment.count({ where: { status: "IN_TRANSIT" } }),
    prisma.shipment.count({ where: { status: "DELIVERED" } }),
    prisma.contactSubmission.count({ where: { isRead: false } }),
    prisma.shipment.count({
      where: { createdAt: { gte: startOfMonth } },
    }),
    prisma.shipment.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const stats = {
    totalShipments,
    pendingShipments,
    inTransitShipments,
    deliveredShipments,
    unreadContacts,
    shipmentsThisMonth,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your shipments and activity.
        </p>
      </div>

      <DashboardStatsCards stats={stats} />
      <RecentActivity shipments={recentShipments} contacts={recentContacts} />
    </div>
  );
}
