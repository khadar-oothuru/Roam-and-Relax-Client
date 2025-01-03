import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { MdOutlineTravelExplore } from "react-icons/md";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import hero from "../assets/hero.jpg";
const HomePage = () => {
  const { isUserLoggedIn } = useContext(UserContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isFading, setIsFading] = useState(false); // State for fade effect

  const carouselItems = [
    {
      image:
        "https://images.pexels.com/photos/10925436/pexels-photo-10925436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      heading: "Explore the World",
      tagline: "Discover new places, create unforgettable memories.",
    },
    {
      image:
        "https://images.pexels.com/photos/28969902/pexels-photo-28969902/free-photo-of-scenic-mountain-hiking-trail-in-washington-state.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      heading: "Adventure Awaits",
      tagline: "Get ready for the thrill of a lifetime.",
    },
    {
      image:
        "https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      heading: "Unwind in Paradise",
      tagline: "Relax and rejuvenate in the world’s most serene places.",
    },
    {
      image:
        "https://images.pexels.com/photos/10088239/pexels-photo-10088239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      heading: "Embrace the Adventure",
      tagline: "Embark on epic journeys and discover new horizons.",
    },
    {
      image:
        "https://images.pexels.com/photos/14594064/pexels-photo-14594064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      heading: "A Journey to Remember",
      tagline: "Make every moment count with unforgettable experiences.",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true); // Start fading effect
      setTimeout(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % carouselItems.length
        );
        setIsFading(false); // End fading effect
      }, 500); // Duration of fade effect
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!isUserLoggedIn) {
    return (
      <div className="flex h-screen">
        <div className="w-[1000px] bg-white flex flex-col justify-center items-start px-16">
          <h1 className="text-5xl font-bold text-[#001337] mb-6">
            TIME TO TRAVEL
          </h1>
          <h2 className="text-3xl font-light text-gray-600 mb-8">
            ARE YOU READY?
          </h2>
          <p className="text-gray-500 mb-6">
            Embark on an unforgettable journey filled with adventure,
            relaxation, and endless opportunities to explore. Whether you're
            planning your dream vacation or a quick getaway, we're here to make
            it effortless for you.
          </p>
          <p className="text-gray-500 mb-10">
            Log in to manage your bookings, or sign up to start your next
            journey with us.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/login"
              className="btn bg-[#001337] text-white px-16 py-2 rounded-lg text-lg hover:bg-[#ff7c5b] transition-all duration-300 flex items-center space-x-1"
            >
              <FaSignInAlt />
              <span>Login</span>
            </Link>
            <Link
              to="/signup"
              className="btn bg-white border border-[#001337] text-[#001337] px-16 py-2 rounded-lg text-lg hover:bg-[#ff7c5b] hover:text-white transition-all duration-300 flex items-center space-x-1"
            >
              <FaUserPlus />
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
        <div className="w-1/2 relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${hero})`, // Ensure `hero` is a valid variable holding the image path.
            }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
          isFading ? "opacity-50" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${carouselItems[currentImageIndex].image})`,
        }}
      ></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-white trade-winds-regular mb-6">
          {carouselItems[currentImageIndex].heading}
        </h1>
        <p className="text-lg text-white opacity-80 mb-8">
          {carouselItems[currentImageIndex].tagline}
        </p>
        <div className="relative">
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-gray-300 bg-opacity-40 z-10 transition-opacity duration-300 ${
              isHovered ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          ></div>

          {/* Button */}
          <button
            className={`btn bg-[#001337] text-white hover:bg-[#ff7c5b] hover:scale-105 text-lg px-8 py-2 rounded-lg flex items-center justify-center h-12 transition-transform duration-300 z-20 relative`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <MdOutlineTravelExplore className="mr-1 w-10" />
            <Link to="/packages">Explore Packages</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
