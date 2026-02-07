import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [captainData, setCaptainData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setCaptainData({
      userName: {
        firstname,
        lastname,
      },
      email,
      password,
    });

    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
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
          <h3 className="text-base font-medium mb-2">What's your name</h3>
          <div className="flex gap-4  mb-6">
            <input
              type="text"
              placeholder="First name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className="px-4 py-2 w-1/2 border rounded-md bg-[#eeeeee] text-lg placeholder:text-base"
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className="px-4 py-2 w-1/2 border rounded-md bg-[#eeeeee] text-lg placeholder:text-base"
            />
          </div>
          <h3 className="text-base font-medium mb-2">What's your email</h3>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 mb-6 w-full border rounded-md bg-[#eeeeee] text-lg placeholder:text-base"
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 mb-6 w-full border rounded-md bg-[#eeeeee] text-lg placeholder:text-base"
          />
          <button className="px-4 py-2 mb-3 w-full rounded-md bg-black text-white font-semibold text-lg">
            Register
          </button>
        </form>
        <p className="text-center">
          Already have a account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight text-black/80">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignUp;
