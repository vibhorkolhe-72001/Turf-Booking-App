import { useNavigate } from "react-router";

function LoginPage({
  setEmail,
  setPassword,
  loginapi,
//   setLoginModal,
  //   loginModal,
}) {
  const navigate = useNavigate();
  return (
    <div>
      {/* {true && ( */}
      <div className="absolute h-screen w-full bg-[#121212] bg-opacity-100 text-white top-0 left-0 flex justify-center">
        <div className="h-full w-full flex justify-center items-center">
          <div className="h-auto w-1/3 border flex flex-col items-center justify-around p-10 rounded-lg bg-[#1f1f1f] max-xl:w-1/2 max-md:w-[80%]">
            <div className="flex flex-col justify-around h-full w-full gap-5">
              <div>
                <h1 className="mb-1">Email</h1>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="border h-10 w-[80%] px-5 text-white border-white max-xl:w-full"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <h1 className="mb-1">Password</h1>
                <input
                  type="password"
                  placeholder="Password"
                  className="border h-10 w-[80%] px-5 text-white border-white max-xl:w-full"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <button
                  className="h-10 px-10 border rounded-lg hover:bg-white hover:text-black"
                  onClick={loginapi}
                >
                  Login
                </button>
                <button
                  className="h-10 px-5 border rounded-lg hover:bg-white hover:text-black"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export default LoginPage;
