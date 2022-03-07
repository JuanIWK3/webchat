import React from "react";
import { Button } from "react-bootstrap";
import { HiUserGroup } from "react-icons/hi";
import { TiContacts } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Container } from "./styles";

export const Avatar = () => {
  const { currentUser } = useAuth();
  return (
    <Container>
      {currentUser.photoURL ? (
        <Link to="/profile">
          <div className="image-wrapper">
            <div
              data-hover="Profile"
              style={{
                backgroundImage: `url(${currentUser.photoURL})`,
              }}
            />
          </div>
        </Link>
      ) : (
        <Link to="/profile">
          <div className="profile-image" data-hover="Profile">
            <div
              data-hover="Profile"
              style={{
                backgroundImage: `url("https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png")`,
              }}
            />
          </div>
        </Link>
      )}
    </Container>
  );
};
