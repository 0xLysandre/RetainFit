import { z } from "zod";

export const memberSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
});

export const classSchema = z.object({
    name: z.string().min(1, "Class name is required"),
    instructor: z.string().optional(),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
});

export const studioSchema = z.object({
    name: z.string().min(1, "Studio name is required"),
});
