import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"

const PrivateRoute = ({ children }) => {
  const { isUserLoggedIn } = useContext(UserContext);

  return isUserLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
