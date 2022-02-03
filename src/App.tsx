/* eslint-disable func-style */
import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Dashboard } from "./components/Dashboard";
import { ForgotPassword } from "./components/ForgotPassword";
import { Login } from "./components/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { Signup } from "./components/Signup";
import { UpdateProfile } from "./components/UpdateProfile";
import { AuthProvider } from "./contexts/AuthContext";
import "./styles/global.scss";

const App = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center flex-column"
      style={{ minHeight: "100vh", width: "100vw", maxWidth: "400px" }}
    >
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute element={Dashboard} />} />
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
    </Container>
  );
};

export default App;
