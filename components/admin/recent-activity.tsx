import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Shipment, ContactSubmission, ShipmentStatus } from "@/lib/types";

interface RecentActivityProps {
  shipments: Shipment[];
  contacts: ContactSubmission[];
}

const statusColors: Record<ShipmentStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  PICKED_UP: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  IN_TRANSIT: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  IN_CUSTOMS: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  OUT_FOR_DELIVERY: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  DELIVERED: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  RETURNED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  ON_HOLD: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
};

function formatStatus(status: string): string {
  return status.replace(/_/g, " ");
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function RecentActivity({ shipments, contacts }: RecentActivityProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Recent Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          {shipments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No shipments yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking #</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Receiver</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell>
                      <Link
                        href={`/admin/shipments/${shipment.id}`}
                        className="font-medium text-orange-600 hover:underline"
                      >
                        {shipment.trackingNumber}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusColors[shipment.status]}
                      >
                        {formatStatus(shipment.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>{shipment.receiverName}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(shipment.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          {contacts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No contact submissions yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <Link
                        href={`/admin/contacts/${contact.id}`}
                        className="font-medium text-orange-600 hover:underline"
                      >
                        {contact.name}
                      </Link>
                    </TableCell>
                    <TableCell>{contact.subject}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(contact.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          contact.isRead
                            ? "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                            : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                        }
                      >
                        {contact.isRead ? "Read" : "Unread"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
