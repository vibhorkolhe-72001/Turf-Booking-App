import { useEffect, useState } from "react";
import footballlogo from "../assets/football.png";
import location from "../assets/location.png";
import TurfCard from "../components/turfCard";

function Venues({ turf }) {
  const [searchVenu, setSearchVenu] = useState("");

  const filterDataByVenue = turf.filter((turf) => {
    return (
      turf.turfName.toLowerCase().includes(searchVenu.toLowerCase()) ||
      turf.city.toLowerCase().includes(searchVenu.toLowerCase())
    );
  });

  return (
    <div className="relative min-h-screen w-full flex justify-center p-2 text-white">
      <div className="min-h-100 w-10/13 flex flex-col max-2xl:w-10/11 max-xl:w-10/13 max-lg:w-10/14 max-sm:w-full">
        <div className="min-h-20 w-full flex">
          <div className="h-full w-full flex flex-col justify-center pl-10">
            <h1 className="capitalize">your location</h1>
            <div className="flex items-center gap-1">
              <img src={location} className="size-5 object-contain" alt="" />
              <h1>Bhopal</h1>
            </div>
          </div>
          <div className="h-full w-full flex justify-center items-center">
            <input
              type="text"
              placeholder="Search for Venue"
              className="h-10 w-[80%] px-10 border rounded-full"
              onChange={(e) => {
                setSearchVenu(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="border rounded-2xl border-gray-500 min-h-40 w-full flex items-center px-5">
          <img src={footballlogo} className="size-32 object-contain" alt="" />
        </div>
        <TurfCard turf={filterDataByVenue} />
      </div>
    </div>
  );
}

export default Venues;
