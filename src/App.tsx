/* eslint-disable func-style */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import { ForgotPassword } from "./components/ForgotPassword/ForgotPassword";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { Signup } from "./components/SignUp";
import { UpdateProfile } from "./components/UpdateProfile";
import { AuthProvider } from "./contexts/AuthContext";

import GlobalStyle from "./styles/global";
import usePersistedState from "./utils/usePersistedState";
import { DefaultTheme, ThemeProvider } from "styled-components";
import dark from "./styles/themes/dark";
import light from "./styles/themes/light";

const App = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>("theme", dark);

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  return (
    <ThemeProvider theme={theme}>
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
        <GlobalStyle />
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                path="/profile"
                element={
                  <PrivateRoute element={Dashboard} toggleTheme={toggleTheme} />
                }
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
    </ThemeProvider>
  );
};

export default App;
