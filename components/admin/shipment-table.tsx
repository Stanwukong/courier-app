"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import type { Shipment, ShipmentStatus } from "@/lib/types";

interface ShipmentTableProps {
  shipments: Shipment[];
  total: number;
  currentPage: number;
  pageSize: number;
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

const allStatuses: ShipmentStatus[] = [
  "PENDING",
  "PICKED_UP",
  "IN_TRANSIT",
  "IN_CUSTOMS",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "RETURNED",
  "ON_HOLD",
];

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

export function ShipmentTable({
  shipments,
  total,
  currentPage,
  pageSize,
}: ShipmentTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  const totalPages = Math.ceil(total / pageSize);

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });
      return newParams.toString();
    },
    [searchParams]
  );

  function handleSearch(value: string) {
    setSearchValue(value);
    startTransition(() => {
      const qs = createQueryString({ search: value || null, page: "1" });
      router.push(`/admin/shipments?${qs}`);
    });
  }

  function handleStatusFilter(value: string) {
    startTransition(() => {
      const qs = createQueryString({
        status: value === "ALL" ? null : value,
        page: "1",
      });
      router.push(`/admin/shipments?${qs}`);
    });
  }

  function handlePageChange(page: number) {
    startTransition(() => {
      const qs = createQueryString({ page: page.toString() });
      router.push(`/admin/shipments?${qs}`);
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by tracking number or name..."
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          defaultValue={searchParams.get("status") || "ALL"}
          onValueChange={handleStatusFilter}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            {allStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {formatStatus(status)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={isPending ? "opacity-60 transition-opacity" : ""}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking Number</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Service Type</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No shipments found.
                </TableCell>
              </TableRow>
            ) : (
              shipments.map((shipment) => (
                <TableRow
                  key={shipment.id}
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(`/admin/shipments/${shipment.id}`)
                  }
                >
                  <TableCell className="font-medium">
                    {shipment.trackingNumber}
                  </TableCell>
                  <TableCell>{shipment.senderName}</TableCell>
                  <TableCell>{shipment.receiverName}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusColors[shipment.status]}
                    >
                      {formatStatus(shipment.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatStatus(shipment.serviceType)}</TableCell>
                  <TableCell>{shipment.shipmentMode}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(shipment.createdAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, total)} of {total} shipments
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1 || isPending}
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
              )
              .map((page, idx, arr) => {
                const prevPage = arr[idx - 1];
                const showEllipsis = prevPage !== undefined && page - prevPage > 1;
                return (
                  <span key={page} className="flex items-center">
                    {showEllipsis && (
                      <span className="px-2 text-muted-foreground">...</span>
                    )}
                    <Button
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      disabled={isPending}
                      className={
                        page === currentPage
                          ? "bg-orange-500 text-white hover:bg-orange-600"
                          : ""
                      }
                    >
                      {page}
                    </Button>
                  </span>
                );
              })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || isPending}
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
