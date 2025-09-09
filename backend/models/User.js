import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 20 },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true, required: true, match: /^[0-9]{10}$/ },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

const userModel = mongoose.model("Users", userSchema, "Users");
export default userModel;
