import express from "express";
import cors from "cors";
import bookingsRouter from "./routes/bookings";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/bookings", bookingsRouter);

app.get("/", (_req, res) => {
  res.send({ status: "ok", message: "Resort Booking API" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
