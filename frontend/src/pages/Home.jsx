import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url('/uber-home.webp')] h-screen pt-8 w-full flex flex-col justify-between">
        <img
          src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png"
          alt="Uber Logo"
          className="w-16 ml-8"
        />
        <div className="bg-white px-4 py-4 pb-8">
          <h2 className="text-3xl font-bold">Get Started With Uber</h2>
          <Link
            to="/login"
            className="flex items-center justify-center bg-black text-white w-full py-3 mt-6 rounded-lg"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home
