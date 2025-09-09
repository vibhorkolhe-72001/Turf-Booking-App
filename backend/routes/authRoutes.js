import express from "express";
import {
  registerUser,
  loginUser,
  loginAdmin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/adminlogin", loginAdmin);

export default router;
