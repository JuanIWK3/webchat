import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Card, Form, FormControl, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
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
import { db } from "../../firebase";
import { IMessage } from "../../types/interfaces";

import { Container } from "./styles";
import { Avatar } from "../Avatar";

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
    <Container>
      <div className="w-100" style={{ height: "90vh" }}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <nav>
            <Avatar />
          </nav>
          <main>
            <div className="chat">
              <div className="h-100">
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
                        placeholder="Enter message"
                        autoComplete="off"
                      ></FormControl>
                      <Button type="submit" variant="outline-secondary">
                        <BiSend />
                      </Button>
                    </InputGroup>
                  </Form>
                </Card.Body>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Container>
  );
};
