import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { Button, Card, Form, FormControl, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { TiContacts } from "react-icons/ti";
import { HiUserGroup } from "react-icons/hi";
import { BiSend } from "react-icons/bi";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { IMessage } from "../types/interfaces";

import { ThemeContext } from "styled-components";

export const Home = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messageRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const getCurrentTime = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes: number | string = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const time = hours + ":" + minutes + " " + ampm;
    return time;
  };

  const deleteMessage = (id: string) => {};

  const updateMessages = (messagesArray: IMessage[]) => {
    for (let i = 0; i < messagesArray.length; i++) {
      setMessages((prevState) => [...prevState, messagesArray[i]]);
    }
  };

  useEffect(() => {
    const recentMessagesQuery = query(
      collection(db, "messages"),
      orderBy("timestamp", "desc"),
      limit(100)
    );

    const unsubscribe = onSnapshot(recentMessagesQuery, (snapshot) => {
      const messagesArray: IMessage[] = [];
      snapshot.docChanges().forEach((change) => {
        if (change.type === "removed") {
          deleteMessage(change.doc.id);
        } else {
          const message: IMessage = change.doc.data() as IMessage;
          message.id = change.doc.id;

          messagesArray.push(message);
        }
      });
      updateMessages(messagesArray);
    });

    return unsubscribe;
  }, []);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    if (messageRef.current?.value.length === 0) return;

    try {
      await addDoc(collection(db, "messages"), {
        name: currentUser?.displayName,
        text: messageRef.current?.value,
        profilePicUrl: currentUser?.photoURL,
        timestamp: getCurrentTime(),
      });
    } catch (error) {
      console.error("Error writing new message to Firebase Database");
    }

    formRef.current?.reset();
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
            <div className="chat">
              <Card className="h-100">
                <Card.Header>Chat</Card.Header>
                <Card.Body
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div id="chat-wrapper">
                    {messages.map((message) => {
                      return (
                        <div
                          id={
                            message.name === currentUser.displayName
                              ? ""
                              : "other-users-message-wrapper"
                          }
                          className="message-wrapper"
                          key={message.id}
                        >
                          <div
                            className="message"
                            id={
                              message.name === currentUser.displayName
                                ? ""
                                : "other-users-message"
                            }
                          >
                            {message.name !== currentUser.displayName && (
                              <div
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  backgroundImage: `url(${currentUser.photoURL})`,
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                  borderRadius: "50%",
                                  marginRight: "16px",
                                }}
                                className="message-pic"
                              ></div>
                            )}
                            <div>
                              {message.name !== currentUser.displayName && (
                                <p id="name">{message.name}</p>
                              )}

                              <p style={{ wordWrap: "break-word" }}>
                                {message.text}
                              </p>
                            </div>
                            <p style={{ marginLeft: "16px", color: "gray" }}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Form ref={formRef} onSubmit={sendMessage}>
                    <InputGroup>
                      <FormControl
                        id="message-input"
                        type="text"
                        ref={messageRef}
                      ></FormControl>
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
