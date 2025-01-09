import React from "react";
import { Navigate } from "react-router-dom";

// This component will check if the user has a token and if not, redirect to login.
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token found, redirect to login
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
