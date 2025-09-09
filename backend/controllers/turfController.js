import turfModel from "../models/Turf.js";

export const turfCreate = async (req, res) => {
  try {
    const {
      ownerId,
      turfName,
      city,
      location,
      pricePerHour,
      sports,
      rating,
      personPlay,
      amenities,
      photos,
      phone,
    } = req.body;

    const turf = await turfModel.create({
      ownerId,
      turfName,
      city,
      location,
      pricePerHour,
      sports,
      rating,
      personPlay,
      amenities,
      photos,
      phone,
    });
    res.status(201).json({ message: "Turf Added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllTurf = async (req, res) => {
  try {
    const turfs = await turfModel.find();
    res.json(turfs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const adminturf = async (req, res) => {
  const id = req.body.id;
  try {
    const admindata = await turfModel.findOne({ ownerId: id });
    res.json(admindata);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
