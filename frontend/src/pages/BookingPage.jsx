import { useEffect, useState } from "react";
import { useParams } from "react-router";

function BookingPage({ turf }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState([]);
  const { id } = useParams();
  const [booking, setBooking] = useState(false);
  const [starttime, setstarttime] = useState("");
  const [endtime, setendtime] = useState("");

  // Get selected turf
  const selectedTurf = turf.find((e) => e._id === id);

  const next10days = () => {
    const days = [];
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-us", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const apiDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8080/api/booking/availableSlots?turfId=${id}&date=${apiDate(
            selectedDate
          )}`
        );
        const data = await response.json();
        setSlots(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, [selectedDate, id, booking]);

  const datatoapi = {
    turf: id,
    date: apiDate(selectedDate),
    startTime: starttime,
    endTime: endtime,
    amount: selectedTurf?.pricePerHour,
  };

  // Function to post data
  const token = localStorage.getItem("authToken");
  const createBooking = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/booking/createbooking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(datatoapi),
        }
      );

      const result = await response.json();
      console.log("Booking Response:", result);

      if (response.ok) {
        alert("Booking Successful!");
        setBooking(false); // close modal
      } else {
        alert(result.message || "Booking Failed!");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Something went wrong!");
    }
  };

  // Function to check if a slot is in the past (for today)
  const isPastSlot = (slot) => {
    const now = new Date();
    const selected = new Date(selectedDate);

    if (selected.toDateString() !== now.toDateString()) {
      return false; // If not today, no slots are past
    }

    const slotDate = new Date(selected);
    slotDate.setHours(slot.startTime, 0, 0, 0);

    return slotDate <= now; // Past or ongoing slot
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center gap-2 p-2 text-white">
      {/* Date Buttons */}
      <div className="min-h-30 w-11/16 border border-gray-400 rounded-2xl grid grid-cols-5 gap-2 items-center p-2 2xl:w-[1300px] max-lg:grid-cols-4 max-lg:w-[80%] max-md:grid-cols-3 max-sm:grid-cols-2 max-8xl:grid-cols-1">
        {next10days().map((value, index) => {
          const isSelected =
            selectedDate.toDateString() === value.toDateString();
          return (
            <button
              key={index}
              onClick={() => setSelectedDate(value)}
              className={`h-10 px-4 py-2 rounded-xl min-w-[90px] flex-shrink-0
              ${
                isSelected
                  ? "bg-green-500 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              {formatDate(value)}
            </button>
          );
        })}
      </div>

      {/* Slots */}
      <div className="h-full w-11/16 p-4 2xl:w-[1300px] max-lg:w-[80%] border rounded-2xl border-gray-400">
        {loading ? (
          <p>Loading...</p>
        ) : slots.length > 0 ? (
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-3 max-sm:grid-cols-2 max-8xl:grid-cols-1">
            {slots.map((slot, index) => {
              const past = isPastSlot(slot);

              return (
                <button
                  onClick={() => {
                    if (!slot.booked && !past) {
                      setBooking(true);
                      setstarttime(slot.startTime);
                      setendtime(slot.endTime);
                    }
                  }}
                  key={index}
                  disabled={slot.booked || past}
                  className={`p-3 rounded-xl border 
                    ${
                      slot.booked
                        ? "bg-red-400 cursor-not-allowed"
                        : past
                        ? "bg-yellow-400 cursor-not-allowed"
                        : "bg-green-400 hover:bg-green-500"
                    }`}
                >
                  {slot.startTime}:00 - {slot.endTime}:00
                </button>
              );
            })}
          </div>
        ) : (
          <p>No slots available</p>
        )}
      </div>

      {/* Booking Modal */}
      {booking && selectedTurf && (
        <div className="absolute h-full w-full top-0 left-0 bg-black/80 flex justify-center items-center">
          <div className="w-[400px] bg-[#1E1E1E] rounded-2xl p-4 flex flex-col gap-4">
            {/* Turf Details */}
            <div className="bg-[#2A2A2A] rounded-xl p-4">
              <h2 className="text-lg font-semibold">{selectedTurf.turfName}</h2>
              <p className="text-sm text-gray-400">
                {formatDate(selectedDate)} • {starttime}:00 - {endtime}:00
              </p>
              <p className="mt-2 text-sm text-gray-400">
                {selectedTurf.personPlay} Vs {selectedTurf.personPlay}
              </p>
            </div>

            {/* Bill Details */}
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold mb-2">Bill Details</h3>
              <div className="flex justify-between">
                <span>Slot Cost</span>
                <span>₹{selectedTurf.pricePerHour}</span>
              </div>
              <div className="flex justify-between text-blue-400 font-bold mt-2">
                <span>Total</span>
                <span>₹{selectedTurf.pricePerHour}</span>
              </div>
            </div>

            {/* Payment Options */}
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold mb-2">Payment Options</h3>
              <div className="flex gap-4">
                <button className="w-1/2 border border-blue-400 rounded-lg py-2">
                  Full ₹{selectedTurf.pricePerHour}
                </button>
                <button
                  className="w-1/2 border border-blue-400 rounded-lg py-2"
                  onClick={createBooking}
                >
                  Book
                </button>
              </div>
            </div>

            <button
              onClick={() => setBooking(false)}
              className="mt-4 w-full py-2 bg-red-500 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingPage;
