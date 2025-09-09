import turfPersonImage from "../assets/one.png";

function HomePage() {
  return (
    <div className="min-h-screen w-full bg-[#131315] text-white flex items-center justify-center p-2">
      <div className="h-full w-10/12  grid grid-cols-2 max-lg:grid-cols-1">
        <div className=" h-full w-full flex items-center justify-center max-lg:order-2">
          <div className="flex flex-col gap-30 max-xl:gap-15">
            <div>
              <h1 className="text-7xl font-semibold max-xl:text-5xl">The easiest way </h1>
              <h1 className="text-7xl font-semibold max-xl:text-5xl">to host games</h1>
            </div>
            <div>
              <h1 className="text-2xl">
                Explore your neighbourhood and find a game in no time.
              </h1>
            </div>
            <div>
              <button className="rounded-full px-10 py-2 text-xl font-semibold bg-[#2d6ce2] flex items-center justify-center">
                Start playing
              </button>
            </div>
          </div>
        </div>
        <div className=" h-full w-full flex justify-center items-center max-lg:order-1">
          <div>
            <img src={turfPersonImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
