function Login({ setEmail, setPassword, ApiLogin }) {
  return (
    <div className="h-screen w-full bg-yellow-100 flex items-center justify-center">
      <div className="min-h-1/3 w-1/3 flex flex-col justify-around border p-10">
        <div className="flex flex-col">
          <h1>Email</h1>
          <input
            type="email"
            placeholder="Email Address"
            className="px-2 border h-10"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <h1>Password</h1>
          <input
            type="password"
            placeholder="Password"
            className="px-2 border h-10"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button className="px-10 border py-2 mt-4" onClick={ApiLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
