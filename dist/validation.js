"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingSchema = void 0;
const zod_1 = require("zod");
exports.bookingSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().min(7).max(20),
    guests: zod_1.z.number().int().min(1).max(20),
    roomType: zod_1.z.string().min(1),
    checkIn: zod_1.z.string().refine((s) => !Number.isNaN(Date.parse(s)), { message: "Invalid date" }),
    checkOut: zod_1.z.string().refine((s) => !Number.isNaN(Date.parse(s)), { message: "Invalid date" }),
    notes: zod_1.z.string().optional()
}).superRefine((data, ctx) => {
    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);
    if (checkOut <= checkIn) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "checkOut must be after checkIn",
            path: ["checkOut"]
        });
    }
});
