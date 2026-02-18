import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { ContactDetailClient } from "@/components/admin/contact-detail-client";

export const metadata = {
  title: "Contact Details",
};

interface ContactDetailPageProps {
  params: Promise<{ id: string }>;
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function ContactDetailPage({
  params,
}: ContactDetailPageProps) {
  const { id } = await params;

  const contact = await prisma.contactSubmission.findUnique({
    where: { id },
  });

  if (!contact) {
    notFound();
  }

  // Mark as read if not already
  if (!contact.isRead) {
    await prisma.contactSubmission.update({
      where: { id },
      data: { isRead: true },
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/contacts">
            <ArrowLeft className="size-4" />
            Back to Contacts
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              {contact.subject}
            </h1>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            >
              Read
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Submitted {formatDate(contact.createdAt)}
          </p>
        </div>
        <ContactDetailClient contactId={contact.id} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <span className="text-muted-foreground">Name</span>
              <p className="font-medium">{contact.name}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Email</span>
              <p className="font-medium">
                <a
                  href={`mailto:${contact.email}`}
                  className="text-orange-600 hover:underline"
                >
                  {contact.email}
                </a>
              </p>
            </div>
            {contact.phone && (
              <div>
                <span className="text-muted-foreground">Phone</span>
                <p className="font-medium">{contact.phone}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Message</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-muted/50 p-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {contact.message}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
