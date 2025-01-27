import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { MdOutlineTravelExplore } from "react-icons/md";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import hero from "../assets/hero.jpg";

const HomePage = () => {
  const { isUserLoggedIn } = useContext(UserContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isFading, setIsFading] = useState(false);

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
      setIsFading(true);
      setTimeout(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % carouselItems.length
        );
        setIsFading(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!isUserLoggedIn) {
    return (
      <div className="flex flex-col md:flex-row h-screen">
        <div
          className="w-full md:w-1/2 h-1/2 md:h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})` }}
        ></div>
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white flex flex-col items-center md:items-start justify-center px-4 md:px-8 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#001337] text-center md:text-left">
            TIME TO TRAVEL
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 text-center md:text-left">
            ARE YOU READY?
          </h2>
          <p className="text-gray-500 text-center md:text-left">
            Embark on an unforgettable journey filled with adventure,
            relaxation, and endless opportunities to explore.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Link
              to="/login"
              className="btn bg-[#001337] text-white px-6 py-2 rounded-lg text-lg flex items-center justify-center hover:bg-[#ff7c5b] transition-all duration-300"
            >
              <FaSignInAlt className="mr-2" /> Login
            </Link>
            <Link
              to="/signup"
              className="btn bg-white border border-[#001337] text-[#001337] px-6 py-2 rounded-lg text-lg flex items-center justify-center hover:bg-[#ff7c5b] hover:text-white transition-all duration-300"
            >
              <FaUserPlus className="mr-2" /> Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
    {/* Background Image */}
    <div
      className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
        isFading ? "opacity-50" : "opacity-100"
      }`}
      style={{
        backgroundImage: `url(${carouselItems[currentImageIndex].image})`,
      }}
    >
      {/* White/Dark Shade Effect */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isHovered ? "bg-white opacity-20" : "bg-black opacity-0"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      ></div>
    </div>
  
    {/* Content */}
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white trade-winds-regular mb-4">
        {carouselItems[currentImageIndex].heading}
      </h1>
      <p className="text-sm sm:text-base lg:text-lg text-white opacity-80 mb-6">
        {carouselItems[currentImageIndex].tagline}
      </p>
      <Link
        to="/packages"
        className="btn bg-[#001337] text-white hover:bg-[#ff7c5b] hover:scale-105 px-8 py-2 rounded-lg flex items-center justify-center transition-transform duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MdOutlineTravelExplore className="h-4 w-4 sm:h-8 sm:w-8" />
        <span className="ml-0 text-lg lg:text-xl sm:text-md font-semibold">
          Explore Packages
        </span>
      </Link>
    </div>
  </div>
  
  );
};

export default HomePage;
