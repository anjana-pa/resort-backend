"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prismaClient_1 = require("../prismaClient");
const validation_1 = require("../validation");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    try {
        const parsed = validation_1.bookingSchema.parse(req.body);
        const created = await prismaClient_1.prisma.booking.create({
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
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({ errors: err.errors });
        }
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/", async (_req, res) => {
    try {
        const bookings = await prismaClient_1.prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
        res.json(bookings);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = router;
