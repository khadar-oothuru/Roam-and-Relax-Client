import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";

const ProfileModal = ({
  isOpen,
  onClose,
  username: initialUsername,
  profileImage: initialProfileImage,
  onProfileUpdate,
}) => {
  const [username, setUsername] = useState(initialUsername);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProfileUpdate = async () => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("username", username);
    if (newProfileImage) {
      formData.append("profileImage", newProfileImage);
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/update`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Notify parent about the updated profile
      onProfileUpdate(response.data.user);
      onClose();
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] sm:w-[500px]">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            aria-label="Close"
          >
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center">
          {initialProfileImage || newProfileImage ? (
            <img
              src={
                newProfileImage ? URL.createObjectURL(newProfileImage) : initialProfileImage
              }
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-300"
            />
          ) : (
            <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-200"></div>
          )}

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="block w-full mt-2 px-4 py-2 text-gray-800 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff7c5b] focus:border-[#ff7c5b]"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewProfileImage(e.target.files[0])}
            className="block w-full mt-4 text-sm text-gray-500 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff7c5b] focus:border-[#ff7c5b]"
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none"
            disabled={loading}
          >
            Close
          </button>
          <button
            onClick={handleProfileUpdate}
            className={`px-4 py-2 rounded-lg text-white focus:outline-none ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#ff7c5b] hover:bg-[#001337]"
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
