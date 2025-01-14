import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"; // Import the js-cookie library
export const UserContext = createContext(); // Add this line


export const UserProvider = ({ children }) => {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [userId, setUserId] = useState(""); // New state for userId

  const updateUserState = (token) => {
    if (token) {
      try {
        const decodedPayload = jwtDecode(token);
        setIsUserLoggedIn(true);
        setUsername(decodedPayload.username || "Guest User");
        setProfileImage(decodedPayload.profileImage || "");
        setUserId(decodedPayload.id || ""); // Extract userId from token
      } catch {
        logout();
      }
    } else {
      setIsUserLoggedIn(false);
      setUsername("");
      setProfileImage("");
      setUserId(""); // Reset userId
    }
  };

  useEffect(() => {
    const token = Cookies.get("userToken");
    updateUserState(token);
  }, []);

  const logout = () => {
    Cookies.remove("userToken");
    updateUserState(null);
  };

  return (
    <UserContext.Provider
      value={{ isUserLoggedIn, username, profileImage, userId, logout, updateUserState }}
    >
      {children}
    </UserContext.Provider>
  );
};
