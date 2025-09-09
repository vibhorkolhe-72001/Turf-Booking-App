import jwt from "jsonwebtoken";
import userModel from "../models/User.js";

const secretKey = "turfplay";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Not authorized" });
  try {
    const userVerify = jwt.verify(token, secretKey);
    req.user = await userModel.findById(userVerify.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};


