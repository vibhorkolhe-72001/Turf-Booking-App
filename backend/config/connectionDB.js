import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/turf_booking");
    console.log("Mongoo DB Connected.....");
  } catch (err) {
    console.log("Connection Error", err);
    process.exit(1);
  }
};

export default connectDB;
