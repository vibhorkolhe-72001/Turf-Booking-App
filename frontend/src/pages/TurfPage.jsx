import { useNavigate, useParams } from "react-router";
import smallfootball from "../assets/smallfootball.png";

function TurfPage({ turf }) {
  const { id } = useParams();
  const dataTurf = turf.find((item) => item._id === id);
  const navigate = useNavigate();

  if (!dataTurf) {
    return (
      <div className="text-white h-screen w-full flex justify-center items-center capitalize text-3xl font-medium absolute top-0 left-0">
        Loading turf details...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#121212] text-white p-2 flex justify-center">
      <div className="h-full w-11/18 flex flex-col p-1">
        <div className="h-96 w-full grid grid-flow-col grid-rows-4 gap-1">
          <div className="h-full w-full row-span-4">
            <img
              src={dataTurf.photos[1]}
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
          <div className="h-full w-full col-span-2 row-span-2">
            <img
              src={dataTurf.photos[2]}
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
          <div className="h-full w-full col-span-2 row-span-2 ">
            <img
              src={dataTurf.photos[0]}
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
        </div>
        <div className="h-full w-full flex flex-col">
          <div className="h-50 w-full flex">
            <div className="h-full w-full flex flex-col justify-center gap-10">
              <h1 className="text-3xl font-semibold">
                {dataTurf.turfName}, {dataTurf.city}
              </h1>
              <h1 className="flex gap-2 items-center">
                <span>
                  <img
                    src={smallfootball}
                    className="size-5 object-contain"
                    alt=""
                  />
                </span>
                {dataTurf.sports[0]} {dataTurf.rating} ⭐
              </h1>
            </div>
            <div className="h-full w-full flex items-center justify-center">
              <button
                className="w-[80%] py-2 rounded-full border hover:bg-blue-600 transition-all duration-300 capitalize"
                onClick={() => {
                  navigate(`/bookingpage/${id}`);
                }}
              >
                book game
              </button>
            </div>
          </div>
          <div className="min-h-50 w-full flex flex-col justify-around">
            <h1 className="text-3xl font-semibold">Address</h1>
            <h1>{dataTurf.location}</h1>
            <span className="flex gap-2">
              <button className="px-10 py-1 rounded-full border hover:bg-blue-600 transition-all duration-300 capitalize">
                Get Direction
              </button>
              <button className="px-5 py-1 rounded-full border hover:bg-blue-600 transition-all duration-300 capitalize">Phone</button>
            </span>
          </div>
          <div className="min-h-50 w-full flex flex-col justify-around">
            <h1 className="text-3xl font-semibold">Venue Info</h1>
            <div>
              <span>
                {dataTurf.personPlay} vs {dataTurf.personPlay}
              </span>
              <span className="ml-5">1 court</span>
            </div>
            <div className="flex gap-4">
              <h1>Aritificial Football Turf</h1>
              <h1>Caged (With rebound walls)</h1>
            </div>
          </div>
          <div className="min-h-50 w-full flex flex-col justify-around">
            <h1 className="text-3xl font-semibold">Amenities</h1>
            <div className="grid grid-cols-3 gap-6">
              {dataTurf.amenities.map((value, index) => (
                <div>
                  <h1>{value}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TurfPage;
