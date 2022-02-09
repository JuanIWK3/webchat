import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

interface IProps {
  element: any;
  toggleTheme?: () => void;
}

export const PrivateRoute: React.FC<IProps> = (props) => {
  const { currentUser } = useAuth();

  return currentUser ? <props.element {...props} /> : <Navigate to="/login" />;
};
