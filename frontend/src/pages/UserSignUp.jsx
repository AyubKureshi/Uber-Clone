import { useState } from "react";
import { Link } from "react-router-dom";

const UserSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      fullName: {
        firstName, lastName
      }, 
      email, 
      password
    });

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  };


  return (
    <div className="p-6 h-screen flex flex-col justify-between">
      <div>
        <img
          src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png"
          alt="Uber Logo"
          className="w-16 mb-12"
        />
        <form onSubmit={handleSubmit} className="">
          <h3 className="text-base font-medium mb-2">What's your name</h3>
          <div className="flex gap-4  mb-6">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="px-4 py-2 w-1/2 border rounded-md bg-[#eeeeee] text-lg placeholder:text-base"
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight text-black/80">
          By proceeding, you consent to get calls, WhatsApp or SMS messages,
          including by automated means, from Uber and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  );
}

export default UserSignUp
