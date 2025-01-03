import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useApi } from "../../context/ApiContext";
import { UserContext } from "../../context/UserContext"; // Import UserContext
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import userimg from "../../assets/login.png";
import Cookies from "js-cookie";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { updateUserState } = useContext(UserContext); // Access context
  const api = useApi();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", credentials);
      const token = response.data.token;
      Cookies.set("userToken", token, { expires: 7 });
      updateUserState(token); // Update user context with new token
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid credentials";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#f0f4f8]">
      <div className="flex flex-col-reverse md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6 w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        {/* Image Section */}
        <div className="w-full md:w-[45%] mb-6 md:mb-0">
          <img
            src={userimg}
            alt="Login"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full text-center md:w-[400px]"
        >
          <h1 className="text-2xl font-bold text-[#001337]">Login</h1>

          {/* Email Input */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-12 border p-4 rounded-lg bg-[#f7fafc] focus:outline-none focus:ring-2 focus:ring-[#001337]"
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
              className="w-full pl-12 border p-4 rounded-lg bg-[#f7fafc] focus:outline-none focus:ring-2 focus:ring-[#001337]"
              onChange={handleChange}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-[#001337] text-white py-3 rounded-lg hover:bg-[#ff7c5b] transition-all"
          >
            <AiOutlineLogin />
            <span>Login</span>
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600">
            New user?{" "}
            <Link to="/signup" className="text-[#001337] hover:underline">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
