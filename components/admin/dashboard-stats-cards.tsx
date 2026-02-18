import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

interface DashboardStatsCardsProps {
  stats: {
    totalShipments: number;
    pendingShipments: number;
    inTransitShipments: number;
    deliveredShipments: number;
    unreadContacts: number;
    shipmentsThisMonth: number;
  };
}

const statCards = [
  {
    key: "totalShipments" as const,
    label: "Total Shipments",
    icon: Package,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    key: "pendingShipments" as const,
    label: "Pending",
    icon: Clock,
    color: "text-yellow-600",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
  },
  {
    key: "inTransitShipments" as const,
    label: "In Transit",
    icon: Truck,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    key: "deliveredShipments" as const,
    label: "Delivered",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-950/30",
  },
  {
    key: "unreadContacts" as const,
    label: "Unread Contacts",
    icon: MessageSquare,
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    key: "shipmentsThisMonth" as const,
    label: "This Month",
    icon: TrendingUp,
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
];

export function DashboardStatsCards({ stats }: DashboardStatsCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.key}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.label}
              </CardTitle>
              <div className={`rounded-md p-2 ${card.bg}`}>
                <Icon className={`size-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats[card.key]}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
