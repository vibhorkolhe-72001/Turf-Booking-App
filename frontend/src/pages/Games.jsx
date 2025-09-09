import turfPerson from "../assets/one.png";

function Games() {
  return (
    <div className="h-screen w-full bg-[#121212] flex items-center justify-center p-2">
      <div className="h-full w-10/15 grid grid-cols-2 p-2">
        <div className="h-full w-full flex justify-center items-center">
          <div className="flex flex-col gap-20">
            <div>
              <h1 className="text-6xl">
                Find games to play <br /> nearby.
              </h1>
            </div>
            <div>
              <button className="px-10 py-2 rounded-full bg-[#2e3136] font-medium">
                Use Current Location
              </button>
            </div>
            <div className="flex flex-col gap-10">
              <h1 className="opacity-80">CITIES WE OPERATE IN</h1>
              <div>
                <button className="px-10 py-2 rounded-full border border-gray-100 font-medium">
                  Bhopal
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-full flex items-center justify-center">
          <img src={turfPerson} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Games;
