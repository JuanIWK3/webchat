import React, { FormEvent, useRef, useState } from "react";
import { Button, Card, Form, FormControl, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { TiContacts } from "react-icons/ti";
import { HiUserGroup } from "react-icons/hi";
import { BiSend } from "react-icons/bi";
import { IMessage } from "../types/interfaces";

export const Home = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messageRef = useRef<HTMLInputElement>(null);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    const today = new Date();
    
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const messageTemp: IMessage = {
      user: currentUser,
      text: messageRef.current?.value,
      time: time
    }
    
    setMessages((prevState) => [...prevState, messageTemp])
    
    return;
  };

  return (
    <>
      <div className="w-100" style={{ height: "90vh" }}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <nav>
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
                  <div
                    className="profile-image image-hover"
                    data-hover="Profile"
                  >
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
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <Link className="btn" id="btn" to="/profile">
                  <div
                    className="profile-image image-hover"
                    data-hover="Profile"
                  >
                    <div
                      style={{
                        width: "4rem",
                        height: "4rem",
                        borderRadius: "50%",
                        backgroundImage: `url("https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png")`,
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
            )}
          </nav>
          <main>
            <aside>
              <Card id="card-aside" className="h-100">
                <Card.Body id="aside-body">
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
                        <div className="h6">
                          <strong>Logan</strong>
                        </div>
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
                        <div className="h6">
                          <strong>Marcos</strong>
                        </div>
                        <div>Cole jao</div>
                      </div>
                    </div>
                  </Button>
                </Card.Body>
              </Card>
            </aside>
            <div className="chat">
              <Card className="h-100">
                <Card.Body
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div></div>
                  <Form onSubmit={sendMessage}>
                    <InputGroup>
                      <FormControl ref={messageRef}></FormControl>
                      <Button type="submit" variant="outline-secondary">
                        <BiSend />
                      </Button>
                    </InputGroup>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};