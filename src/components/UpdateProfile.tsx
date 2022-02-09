import React, { FormEvent, useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { DeleteAccountModal } from "./Modal/DeleteAccountModal";

export const UpdateProfile = () => {
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const newPasswordRef = useRef<any>(null);
  const nameRef = useRef<any>(null);
  const photoURLRef = useRef<any>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    currentUser,
    emailUpdate,
    passwordUpdate,
    nameUpdate,
    photoURLUpdate,
    login,
  } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setError("");
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Invalid Password");
      return;
    }

    if (
      nameRef.current.value === currentUser.displayName &&
      emailRef.current.value === currentUser.email &&
      newPasswordRef.current.value === ""
    ) {
      setError("There is no change");
    }

    //* Photo Update

    if (
      photoURLRef.current.value !== currentUser.photoURL &&
      photoURLRef.current.value !== ""
    ) {
      try {
        setError("");
        setSuccess("");
        await photoURLUpdate(photoURLRef.current.value);
        setSuccess("Photo updated");
      } catch (error) {
        setError("Error updating photo");
      }
    }

    //* Name Update

    if (
      nameRef.current.value !== currentUser.displayName &&
      nameRef.current.value !== ""
    ) {
      try {
        setError("");
        setSuccess("");
        await nameUpdate(nameRef.current.value);
        setSuccess("Name updated");
      } catch (error) {
        setError("Error updating name");
      }
    }

    if (
      emailRef.current.value !== currentUser.email &&
      newPasswordRef.current.value !== ""
    ) {
      setError("Please, change only one at a time");
      return;
    }

    //* Email Update

    if (emailRef.current.value !== currentUser.email) {
      try {
        setError("");
        setSuccess("");
        setLoading(true);
        await emailUpdate(emailRef.current.value);
        setSuccess("Email updated");
      } catch {
        setError("Failed to update email");
      }
      setLoading(false);
    }

    //* Password Update

    if (newPasswordRef.current.value !== "") {
      try {
        setError("");
        setSuccess("");
        await passwordUpdate(newPasswordRef.current.value);
        setSuccess("Password updated");
      } catch {
        setError("Failed to update password");
      }
    }

    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  };

  return (
    <>
      <Card className="w-100" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2" id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                ref={nameRef}
                defaultValue={currentUser.displayName}
              />
            </Form.Group>
            <Form.Group className="mb-2" id="photoURL">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                type="text"
                ref={photoURLRef}
                defaultValue={currentUser.photoURL}
              />
            </Form.Group>
            <Form.Group className="mb-2" id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currentUser.email}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                minLength={6}
                type="password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" id="new-password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                minLength={6}
                type="password"
                ref={newPasswordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button
              disabled={loading}
              className="w-100 text-center mt-2"
              type="submit"
            >
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <DeleteAccountModal />
    </>
  );
};
