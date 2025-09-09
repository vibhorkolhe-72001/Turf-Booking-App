import bookingModel from "../models/booking.js";

export const createBooking = async (req, res) => {
  try {
    const { turf, date, startTime, endTime, amount } = req.body;
    const user = req.user._id;

    if (!turf || !date || !startTime || !endTime || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // booking allowed: 6 AM to 12 AM
    if (startTime < 6 || endTime > 24) {
      return res
        .status(400)
        .json({ message: "⛔ You can only book between 6 AM and 12 AM" });
    }

    // at least 1 hr
    if (endTime - startTime < 1) {
      return res
        .status(400)
        .json({ message: "⛔ Minimum booking duration is 1 hour" });
    }

    // check overlapping
    const conflict = await bookingModel.findOne({
      turf,
      date,
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
        { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
      ],
    });

    if (conflict)
      return res.status(400).json({ message: "⛔ Slot already booked" });

    const booking = await bookingModel.create({
      user,
      turf,
      date,
      startTime,
      endTime,
      amount,
    });
    res.status(201).json({ message: "✅ Booking successful", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find({ user: req.user._id })
      .populate("turf");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get available slots for a date & turf
export const getAvailableSlots = async (req, res) => {
  try {
    const { turfId, date } = req.query;

    // fetch all bookings for that turf & date
    const bookings = await bookingModel.find({ turf: turfId, date: date });

    // generate slots from 6 to 24
    const slots = [];
    for (let hour = 6; hour < 24; hour++) {
      const slot = { startTime: hour, endTime: hour + 1, booked: false };

      // check if slot overlaps with any booking
      for (let booking of bookings) {
        if (
          slot.startTime < booking.endTime &&
          slot.endTime > booking.startTime
        ) {
          slot.booked = true;
          break;
        }
      }

      slots.push(slot);
    }

    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getadminbooking = async (req, res) => {
  try {
    const id = req.body.id;
    const resp = await bookingModel.find({ turf: id });
    res.json({ resp });
  } catch (error) {
    console.log("admin booking error");
    res.status(500).json({ message: err.message });
  }
};
