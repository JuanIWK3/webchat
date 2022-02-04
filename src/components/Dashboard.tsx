import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { IUserData } from "../types/interfaces";
import { TiArrowBackOutline } from "react-icons/ti";

export const Dashboard = () => {
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
      console.log(docSnap.data());
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
    <>
      <Card className="w-100" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <div className="nav-title">
            <Link to="/">
              <TiArrowBackOutline size={20} />
            </Link>
            <h2 className="text-center">Profile</h2>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          {currentUser.photoURL ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "8px",
              }}
            >
              <div className="profile-image" id="image-border">
                <div
                  style={{
                    width: "8rem",
                    height: "8rem",
                    borderRadius: "50%",
                    backgroundImage: `url(${currentUser.photoURL})`,
                    backgroundPosition: "center",
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
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
};
