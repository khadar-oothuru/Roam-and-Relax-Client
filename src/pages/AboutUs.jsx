import React from "react";
import { motion } from "framer-motion";
import Testimonial from "./Testimonial/Testimonial";
import aboutImage from "../assets/about.jpg"; // Replace with the actual path
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-[#001337] p-8 lg:p-16">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Text Section */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-6 text-[#ff7c5b]">About Us</h1>
          <p className="text-lg leading-relaxed">
            Welcome to{" "}
            <span className="text-[#001337] font-bold">Roam and Relax</span>, 
            your trusted travel companion. We curate journeys tailored to your 
            dreams, ensuring every trip is filled with joy and memories.
          </p>
        </div>

        {/* Image Section */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="flex-1 flex justify-center"
        >
          <img
            src={aboutImage}
            alt="Travel Experience"
            className="rounded-lg w-3/4 max-w-sm"
          />
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-16">
        <Testimonial />
      </div>

      {/* Buttons Section */}
      <div className="flex justify-center gap-6 mt-12">
        <Link to="/contact">
          <button
            className="px-8 py-3 text-[#ff7c5b] font-bold rounded-lg border-2 border-[#1f1e1e] hover:bg-[#ff7c5b] hover:text-white transition-all"
          >
            Contact for more details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
