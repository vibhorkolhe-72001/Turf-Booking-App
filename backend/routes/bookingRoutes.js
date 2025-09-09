import express from "express";
import {
  createBooking,
  getUserBookings,
  getAvailableSlots,
  getadminbooking,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createBooking", protect, createBooking);
router.get("/myBookings", protect, getUserBookings);
router.get("/availableSlots", getAvailableSlots);
router.post("/getadminbooking", protect, getadminbooking);

export default router;
