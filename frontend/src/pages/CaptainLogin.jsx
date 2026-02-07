import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    setCaptainData({
      email: email,
      password: password,
    });

    setEmail("");
    setPassword("");
  };


  return (
    <div className="p-6 h-screen flex flex-col justify-between">
      <div>
        <img
          src="https://staging.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber Logo"
          className="w-16 mb-12"
        />
        <form onSubmit={handleSubmit} className="">
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 mb-6 w-full border rounded-md bg-[#eeeeee] text-lg placeholder:text-base"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 mb-6 w-full border rounded-md bg-[#eeeeee] text-lg placeholder:text-base"
          />
          <button className="px-4 py-2 mb-3 w-full rounded-md bg-black text-white font-semibold text-lg">
            Login
          </button>
        </form>
        <p className="text-center">
          Want to join a fleet?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="flex items-center justify-center px-4 py-2 mb-6 w-full rounded-md bg-[#10b461] text-white font-semibold text-lg"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
