import { User } from "firebase/auth";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  element: React.ComponentType;
}

export const PrivateRoute: React.FC<Props> = ({ element: RouteElement }) => {
  const { currentUser } = useAuth();

  return currentUser ? <RouteElement /> : <Navigate to="/login" />;
};
