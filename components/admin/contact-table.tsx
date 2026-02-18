"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ContactSubmission } from "@/lib/types";

interface ContactTableProps {
  contacts: ContactSubmission[];
  total: number;
  currentPage: number;
  pageSize: number;
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ContactTable({
  contacts,
  total,
  currentPage,
  pageSize,
}: ContactTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

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

  function handlePageChange(page: number) {
    startTransition(() => {
      const qs = createQueryString({ page: page.toString() });
      router.push(`/admin/contacts?${qs}`);
    });
  }

  return (
    <div className="space-y-4">
      <div className={isPending ? "opacity-60 transition-opacity" : ""}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No contact submissions found.
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((contact) => (
                <TableRow
                  key={contact.id}
                  className={`cursor-pointer ${
                    !contact.isRead
                      ? "bg-orange-50 dark:bg-orange-950/20"
                      : ""
                  }`}
                  onClick={() => router.push(`/admin/contacts/${contact.id}`)}
                >
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
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
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, total)} of {total} submissions
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
