import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  guests: z.number().int().min(1).max(20),
  roomType: z.string().min(1),
  checkIn: z.string().refine((s) => !Number.isNaN(Date.parse(s)), { message: "Invalid date" }),
  checkOut: z.string().refine((s) => !Number.isNaN(Date.parse(s)), { message: "Invalid date" }),
  notes: z.string().optional()
}).superRefine((data, ctx) => {
  const checkIn = new Date(data.checkIn);
  const checkOut = new Date(data.checkOut);
  if (checkOut <= checkIn) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "checkOut must be after checkIn",
      path: ["checkOut"]
    });
  }
});
