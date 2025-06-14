import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.userSlice.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 1) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default ProtectedRoute;
