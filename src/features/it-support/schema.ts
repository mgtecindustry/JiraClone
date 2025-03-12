import { z } from "zod";
import { ItSupportTaskPriority, ItSupportTaskStatus } from "./types";

// Schema pentru formular - doar ce completează utilizatorul
export const itSupportFormSchema = z.object({
  name: z.string().trim().min(1, "Numele problemei este obligatoriu"),
  description: z
    .string()
    .min(10, "Descrierea trebuie să aibă minim 10 caractere"),
});

// Schema completă pentru baza de date
export const createItSupportTaskSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  description: z.string().min(10, "Required min 10 characters"),
  status: z.nativeEnum(ItSupportTaskStatus, { required_error: "Required" }),
  dueDate: z.coerce.date(),
  createdAt: z.coerce.date(),
  userId: z.string().trim().min(1, "Required"),
  priority: z.nativeEnum(ItSupportTaskPriority, { required_error: "Required" }),
  requesterName: z.string().trim().min(1, "Required"),
  requesterEmail: z.string().email("Invalid email"),
});

// Adaugă acest nou tip pentru request
export const itSupportRequestSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  description: z.string().min(10, "Required min 10 characters"),
});

// Tipuri pentru TypeScript
export type ItSupportFormData = z.infer<typeof itSupportFormSchema>;
export type ItSupportTask = z.infer<typeof createItSupportTaskSchema>;
export type ItSupportRequest = z.infer<typeof itSupportRequestSchema>;
