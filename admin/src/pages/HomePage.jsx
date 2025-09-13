import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import

function HomePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [data, setData] = useState({});
  const [booking, setBooking] = useState([]);
  const [token, setToken] = useState("");
  const [loadingTurf, setLoadingTurf] = useState(true);
  const [loadingBooking, setLoadingBooking] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (!savedToken) {
      navigate("/");
      return;
    }

    try {
      setToken(savedToken);
      const decoded = jwtDecode(savedToken);
      if (decoded.role !== "admin") {
        navigate("/");
        return;
      }
      setProfile(decoded);
    } catch (err) {
      console.error("Invalid token", err);
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (!profile.id) return;

    const fetchTurf = async () => {
      try {
        const resp = await fetch("http://localhost:8080/api/turf/adminturf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, // ✅ Best practice
          },
          body: JSON.stringify({ id: profile.id }),
        });
        const result = await resp.json();
        setData(result);
      } catch (error) {
        console.error("Turf API call failed", error);
      } finally {
        setLoadingTurf(false);
      }
    };

    fetchTurf();
  }, [profile.id, token]);

  useEffect(() => {
    if (!data._id) return;

    const fetchBookings = async () => {
      try {
        const resp = await fetch(
          "http://localhost:8080/api/booking/getadminbooking",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`, // ✅ Add here too
            },
            body: JSON.stringify({ id: data._id }),
          }
        );
        const result = await resp.json();
        setBooking(result.resp || []);
      } catch (error) {
        console.error("Booking API call failed", error);
      } finally {
        setLoadingBooking(false);
      }
    };

    fetchBookings();
  }, [data._id, token]);

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="relative h-screen w-full bg-blue-300 flex flex-col gap-2 p-1">
      {/* Header */}
      <div className="border min-h-20 flex items-center justify-between p-5">
        <button className="border px-2 py-2 rounded-xl">
          Admin Id: {profile.id}
        </button>
        <button className="border px-10 py-2 rounded-xl" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Profile Info */}
      <div className="min-h-20 w-full border grid grid-cols-3">
        <div className="border flex items-center justify-center">
          <h1 className="capitalize">{profile.name}</h1>
        </div>
        <div className="border flex items-center justify-center">
          <h1 className="capitalize">{profile.role} Panel</h1>
        </div>
        <div className="border flex items-center justify-center">
          <h1>{profile.email}</h1>
        </div>
      </div>

      {/* Turf & Bookings */}
      <div className="min-h-50 w-full border grid grid-cols-2 p-1">
        {/* Turf Details */}
        <div className="h-full w-full border flex items-center justify-center">
          {loadingTurf ? (
            <h1 className="text-xl">Loading turf data...</h1>
          ) : data.turfName ? (
            <div className="text-2xl space-y-1">
              <h1>{data.turfName}</h1>
              <h1>{data.city}</h1>
              <h1>{data.location}</h1>
              <h1>{data.pricePerhour}</h1>
              <h1>{data.sports?.join(", ")}</h1>
              <h1>{data.rating}</h1>
              <h1>{data.personPlay}</h1>
              <h1>{data.amenities?.join(", ")}</h1>
              <h1>{data.phone}</h1>
              <h1>{new Date(data.createdAt).toLocaleString()}</h1>
            </div>
          ) : (
            <h1 className="text-xl">No turf found</h1>
          )}
        </div>

        {/* Booking List */}
        <div className="h-full w-full border p-2 overflow-hidden">
          <h1 className="text-2xl font-bold mb-2">Bookings</h1>
          <div className="relative h-full w-full border overflow-y-scroll p-2 pb-16">
            {loadingBooking ? (
              <h1 className="text-center text-lg">Loading bookings...</h1>
            ) : booking.length > 0 ? (
              booking.map((value, idx) => (
                <div
                  key={value._id || idx}
                  className="border p-2 my-2 rounded-md bg-white shadow-md"
                >
                  <h1>
                    <strong>Booking ID:</strong> {value._id}
                  </h1>
                  <h1>
                    <strong>Amount:</strong> {value.amount || "N/A"}
                  </h1>
                  <h1>
                    <strong>UserId:</strong> {value.user || "N/A"}
                  </h1>
                  <h1>
                    <strong>Date:</strong> {value.date || "N/A"}
                  </h1>
                  <h1>
                    <strong>Status:</strong> {value.status || "Pending"}
                  </h1>
                </div>
              ))
            ) : (
              <h1 className="text-center text-lg">No bookings found</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
