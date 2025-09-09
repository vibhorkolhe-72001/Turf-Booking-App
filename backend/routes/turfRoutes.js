import express from "express";
import {
  turfCreate,
  getAllTurf,
  adminturf,
} from "../controllers/turfController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createTurf", protect, turfCreate);
router.get("/getTurf", getAllTurf);
router.post("/adminturf", protect, adminturf);

export default router;
