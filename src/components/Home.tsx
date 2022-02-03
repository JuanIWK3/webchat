import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { TiContacts } from "react-icons/ti";
import { HiUserGroup } from "react-icons/hi";

export const Home = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <Card className="w-100" style={{ height: "90vh" }}>
        <Card.Body style={{ display: "flex", flexDirection: "column" }}>
          {currentUser.photoURL ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <Link className="btn" id="btn" to="/profile">
                <div className="profile-image image-hover" data-hover="Profile">
                  <div
                    style={{
                      width: "4rem",
                      height: "4rem",
                      borderRadius: "50%",
                      backgroundImage: `url(${currentUser.photoURL})`,
                      backgroundPosition: "center",
                    }}
                  />
                </div>
              </Link>
              <div>
                <Button id="button" variant="link">
                  <HiUserGroup size={40} />
                </Button>
                <Button id="button" variant="link">
                  <TiContacts size={40} />
                </Button>
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
          <Button variant="link" id="btn-outline">
            Geral
          </Button>
          <Button variant="link" id="btn-outline">
            <div>
              <img
                style={{
                  height: "50px",
                  width: "auto",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
                src="https://i.pinimg.com/280x280_RS/74/69/6c/74696ce6cd3eb1379fd6548e58d73ddd.jpg"
                alt=""
              />
              <div>
                <div className="h6"><strong>Logan</strong></div>
                <div>O menacing</div>
              </div>
            </div>
          </Button>
          <Button variant="link" id="btn-outline">
            <div>
              <img
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
                src="https://pbs.twimg.com/media/D8u_cGmWsAA6w7c?format=jpg&name=large"
                alt=""
              />
              <div>
                <div className="h6"><strong>Marcos</strong></div>
                <div>Cole jao</div>
              </div>
            </div>
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};
