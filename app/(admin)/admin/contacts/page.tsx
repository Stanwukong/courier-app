import { prisma } from "@/lib/prisma";
import { ContactTable } from "@/components/admin/contact-table";

export const metadata = {
  title: "Contact Submissions",
};

const PAGE_SIZE = 10;

interface ContactsPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function ContactsPage({
  searchParams,
}: ContactsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));

  const [contacts, total] = await Promise.all([
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.contactSubmission.count(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Contact Submissions
        </h1>
        <p className="text-muted-foreground">
          View and manage contact form submissions.
        </p>
      </div>

      <ContactTable
        contacts={contacts}
        total={total}
        currentPage={page}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
}
