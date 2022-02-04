/* eslint-disable func-style */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Dashboard } from "./components/Dashboard";
import { ForgotPassword } from "./components/ForgotPassword";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { Signup } from "./components/Signup";
import { UpdateProfile } from "./components/UpdateProfile";
import { AuthProvider } from "./contexts/AuthContext";
import "./styles/global.scss";
import "./styles/home.scss";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
        padding: "0 16px 0 16px",
      }}
    >
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/profile"
              element={<PrivateRoute element={Dashboard} />}
            />
            <Route path="/" element={<PrivateRoute element={Home} />} />
            <Route
              path="/update-profile"
              element={<PrivateRoute element={UpdateProfile} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
