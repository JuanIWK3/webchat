import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  element: React.ComponentType;
  path?: string;
}

export const PrivateRoute: React.FC<Props> = ({ element: RouteElement }) => {
  const currentUser = useAuth();
  console.log(currentUser);

  if (currentUser !== null) {
    return <RouteElement />;
  } else {
    return <Navigate to="/login" />;
  }
};
