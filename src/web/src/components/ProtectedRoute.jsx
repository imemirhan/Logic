import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const user = useSelector((state) => state.userSlice.user);
//   const roleEmployer = user.
  // If user is not logged in, redirect to login page
  const isEmplyoer = user.role === 1 ? true : false;
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  if (isEmplyoer || user === null) {
    return <Navigate to="/profile" replace />;
  }
  return children;
};

export default ProtectedRoute;
