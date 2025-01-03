import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const User = () => {
  const [profile, setProfile] = useState({ name: "", profileImage: "" });
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        // Decode the payload of the JWT
        const decodedPayload = jwtDecode(token);
        console.log("Decoded Payload:", decodedPayload);

        // Decode the header of the JWT (useful for advanced cases like validation)
        const decodedHeader = jwtDecode(token, { header: true });
        console.log("Decoded Header:", decodedHeader);

        // Set profile state with decoded data
        setProfile({
          name: decodedPayload.username || "Guest User", // Update key if necessary
          profileImage: decodedPayload.profileImage || "", // Update key if necessary
        });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.warn("No token found in localStorage");
    }
  }, []);

  const handleLogout = () => {
    // Clear the JWT from localStorage
    localStorage.removeItem("userToken");

    // Reset the profile state
    setProfile({ name: "", profileImage: "" });

    // Redirect to the login page
    navigate("/login");

    console.log("User logged out");
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-white rounded-lg shadow-md w-full max-w-sm mx-auto">
      <img
        src={profile.profileImage || "https://via.placeholder.com/150"}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-800">
        {profile.name || "Guest User"}
      </h2>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default User;
