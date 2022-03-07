import React, { useContext, useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { Alert, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { TiArrowBackOutline } from "react-icons/ti";
import Switch from "react-switch";
import { ThemeContext } from "styled-components";
import { shade } from "polished";
import { Container } from "./styles";
import { IUserData } from "../../types/interfaces";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

interface IProps {
  toggleTheme: () => void;
}

const Dashboard = ({ toggleTheme }: IProps) => {
  const { colors, title } = useContext(ThemeContext);
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<IUserData>({
    id: "",
    friends: [],
    name: "",
    photoURL: "",
  });

  const getUserData = async (email: string) => {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data() as IUserData);
    } else {
      setError("Could not find user data");
    }
  };

  useEffect(() => {
    getUserData(currentUser.email);
  }, []);

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <Container>
      <div>
        <div className="nav-title">
          <Link to="/">
            <TiArrowBackOutline size={20} />
          </Link>
          <h2>Profile</h2>
          <Switch
            onChange={toggleTheme}
            checked={title === "dark"}
            checkedIcon={false}
            uncheckedIcon={false}
            height={20}
            width={50}
            offColor={shade(0.3, colors.primary)}
            onColor={shade(0.8, colors.secondary)}
            onHandleColor={colors.secondary}
            offHandleColor={colors.primary}
          />
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        {currentUser.photoURL ? (
          <div className="image-wrapper">
            <div className="profile-image" id="image-border">
              <div
                style={{
                  backgroundImage: `url(${currentUser.photoURL})`,
                }}
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "8px",
            }}
          >
            <div id="image">
              <img
                style={{ height: "8rem", borderRadius: "50%" }}
                src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                alt=""
              />
            </div>
          </div>
        )}
        <p>
          <strong>Name: </strong> {currentUser.displayName}
        </p>
        <p>
          <strong>Email: </strong> {userData.id}
        </p>

        <Link className="w-100 btn btn-primary" to="/update-profile">
          Update Profile
        </Link>

        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
