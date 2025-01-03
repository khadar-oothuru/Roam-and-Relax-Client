import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import userimg from "../../assets/admin.jpg";
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
      <div className="flex items-center justify-center space-x-6 w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        {/* Image Section */}
        <div className="hidden md:block w-[45%]">
          <img
            src={userimg}
            alt="Signup"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6 w-full sm:w-[400px]">
          <h1 className="text-2xl font-bold text-[#001337] text-center">
            User Signup
          </h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border p-4 rounded-lg bg-[#f7fafc] focus:outline-none focus:ring-2 focus:ring-[#001337] focus:border-[#001337]"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-4 rounded-lg bg-[#f7fafc] focus:outline-none focus:ring-2 focus:ring-[#001337] focus:border-[#001337]"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-4 rounded-lg bg-[#f7fafc] focus:outline-none focus:ring-2 focus:ring-[#001337] focus:border-[#001337]"
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="profileImage"
            onChange={handleFileChange}
            className="w-full p-4 rounded-lg bg-[#f7fafc]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#001337] text-white py-3 rounded-lg hover:bg-[#ff7c5b] transition-all"
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
      </div>
    </div>
  );
};

export default SignUp;
