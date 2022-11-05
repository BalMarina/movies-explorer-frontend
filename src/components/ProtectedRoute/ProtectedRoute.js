import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, loggedIn, ...props }) => {
  if (!loggedIn) {
    return <Navigate to='/signin' />
  }
  return <Component {...props} />
};

export default ProtectedRoute; 