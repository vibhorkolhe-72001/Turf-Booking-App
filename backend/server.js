import express from "express";
import cors from "cors";

import connectDB from "./config/connectionDB.js";
import authRoutes from "./routes/authRoutes.js";
import turfRoutes from "./routes/turfRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const port = 8080;
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/turf", turfRoutes);
app.use("/api/booking", bookingRoutes);

app.listen(port, () => {
  console.log("Server Running At Port", port);
});
 