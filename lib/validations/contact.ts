import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().or(z.literal("")),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;
