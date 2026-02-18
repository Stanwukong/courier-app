import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { ContactFormSchema } from "@/lib/validations/contact";
import type { PaginatedResponse, ContactSubmission } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = ContactFormSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const contact = await prisma.contactSubmission.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        phone: validated.data.phone || null,
        subject: validated.data.subject,
        message: validated.data.message,
      },
    });

    return NextResponse.json(
      { success: true, data: contact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "10", 10)));
    const isReadParam = searchParams.get("isRead");

    const where: { isRead?: boolean } = {};
    if (isReadParam === "true") {
      where.isRead = true;
    } else if (isReadParam === "false") {
      where.isRead = false;
    }

    const [contacts, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.contactSubmission.count({ where }),
    ]);

    const response: PaginatedResponse<ContactSubmission> = {
      data: contacts,
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Contact list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
