import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import userimg from "../../assets/Signup.png";
import { useApi } from "../../context/ApiContext";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    profileImage: null,
  });

  const api = useApi();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleFileChange = (e) => {
    setCredentials({ ...credentials, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", credentials.username);
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);
    formData.append("profileImage", credentials.profileImage);

    try {
      const response = await api.post("/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#f0f4f8]">
      <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg space-y-6 sm:space-y-0 sm:space-x-6">
        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full sm:w-[60%] text-center"
        >
          <h1 className="text-2xl font-bold text-[#001337]"> Signup</h1>
          {/* Username Input */}
          <div className="relative">
            <FaUser className="absolute left-4 top-4 text-gray-400" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full pl-12 border p-3 rounded-lg bg-[#f7fafc] focus:outline-none focus:ring-2 focus:ring-[#001337]"
              onChange={handleChange}
              required
            />
          </div>
          {/* Email Input */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-12 border p-3 rounded-lg bg-[#f7fafc] focus:outline-none focus:ring-2 focus:ring-[#001337]"
              onChange={handleChange}
              required
            />
          </div>
          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute left-4 top-4 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full pl-12 border p-3 rounded-lg bg-[#f7fafc] focus:outline-none focus:ring-2 focus:ring-[#001337]"
              onChange={handleChange}
              required
            />
          </div>
          {/* File Input */}
          <div className="relative">
            <FaImage className="absolute left-4 top-4 text-gray-400" />
            <input
              type="file"
              name="profileImage"
              className="w-full pl-12 border p-3 rounded-lg bg-[#f7fafc]"
              onChange={handleFileChange}
              required
            />
          </div>
          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-[#001337] text-white py-2 rounded-lg hover:bg-[#ff7c5b] transition-all"
          >
            Signup
          </button>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#001337] hover:underline">
              Login here
            </Link>
          </p>
        </form>

        {/* Image Section */}
        <div className="w-full sm:w-[50%]">
          <img
            src={userimg}
            alt="Signup"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
