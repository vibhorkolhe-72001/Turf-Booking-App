import { useNavigate } from "react-router";
import footground from "../assets/footballground.png";
import star from "../assets/star.png";
import user from "../assets/user.png";

function TurfCard({ turf }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-100 w-full p-5 grid grid-cols-3 gap-3 justify-items-center max-xl:grid-cols-2 max-lg:grid-cols-1">
      {turf.length > 0 ? (
        turf.map((value, key) => {
          return (
            <div
              key={key}
              className="h-[300px] w-[350px] p-1 flex flex-col"
              onClick={() => {
                navigate(`/turfpage/${value._id}`);
              }}
            >
              <div className="h-[200px] w-full">
                <img
                  src={footground}
                  className="h-full w-full object-cover rounded-2xl"
                  alt=""
                />
              </div>
              <div className="h-full w-full flex flex-col">
                <div className="h-full w-full flex justify-between items-center">
                  <h1>
                    {value.turfName} ({value.city})
                  </h1>
                  <span className="flex gap-1 items-center">
                    <h1>{value.rating}</h1>
                    <img src={star} className="size-4 object-contain" alt="" />
                  </span>
                </div>
                <div className="h-full w-full flex gap-2 items-center">
                  <h1 className="bg-[#272a2e] rounded-full px-5 py-1">
                    {value.personPlay}
                  </h1>
                  <span className="flex gap-1 items-center">
                    <h1>Rs {value.pricePerHour} /</h1>
                    <img src={user} className="size-4 object-contain" alt="" />
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-400 text-center">No venues found</p>
      )}
    </div>
  );
}

export default TurfCard;
