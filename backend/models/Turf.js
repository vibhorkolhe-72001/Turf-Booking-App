import mongoose, { model } from "mongoose";

const turfSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    turfName: { type: String, required: true },
    city: { type: String, required: true },
    location: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    sports: [{ type: String, required: true }],
    rating: { type: Number, required: true, min: 0, max: 5 },
    personPlay: { type: Number, required: true },
    amenities: [{ type: String, required: true }],
    photos: [{ type: String, required: true }],
    phone: { type: String, required: true, minlength: 10, maxlength: 10 },
  },
  { timestamps: true }
);

const turfModel = mongoose.model("turflocation", turfSchema, "turflocation");
export default turfModel;
