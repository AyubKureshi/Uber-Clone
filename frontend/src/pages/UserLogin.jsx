import { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserData({
      email: email, 
      password: password, 
    });

    setEmail('');
    setPassword('');
  }
  

  return (
    <div className="p-6 h-screen flex flex-col justify-between">
      <div>
        <img
          src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png"
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
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="flex items-center justify-center px-4 py-2 mb-6 w-full rounded-md bg-[#10b461] text-white font-semibold text-lg"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
