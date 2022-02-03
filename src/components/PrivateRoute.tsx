import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

interface IProps {
  element: React.ComponentType;
}

export const PrivateRoute: React.FC<IProps> = ({ element: RouteElement }) => {
  const { currentUser } = useAuth();

  return currentUser ? <RouteElement /> : <Navigate to="/login" />;
};
