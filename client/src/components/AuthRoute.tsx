import React from "react";
import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  if (!Auth.loggedIn()) {
    // If the user is not logged in, redirect them to the login page
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, render the protected content
  return <>{children}</>;
};

export default AuthRoute;