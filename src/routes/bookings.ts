import { Router } from "express";
import { prisma } from "../prismaClient";
import { bookingSchema } from "../validation";
import { z } from "zod";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const parsed = bookingSchema.parse(req.body);
    const created = await prisma.booking.create({
      data: {
        fullName: parsed.fullName,
        email: parsed.email,
        phone: parsed.phone,
        guests: parsed.guests,
        roomType: parsed.roomType,
        checkIn: new Date(parsed.checkIn),
        checkOut: new Date(parsed.checkOut),
        notes: parsed.notes
      }
    });
    res.status(201).json(created);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (_req, res) => {
  try {
    const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
