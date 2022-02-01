import React, { FormEvent, useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { DeleteAccountModal } from "./Modal/DeleteAccountModal";

export const UpdateProfile = () => {
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const newPasswordRef = useRef<any>(null);
  const nameRef = useRef<any>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser, emailUpdate, passwordUpdate, nameUpdate } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      nameRef.current.value === currentUser.displayName &&
      emailRef.current.value === currentUser.email &&
      newPasswordRef.current.value === ""
    ) {
      setError("There is no change");
    }

    if (nameRef.current.value !== currentUser.displayName) {
      try {
        setError("");
        setSuccess("");
        await nameUpdate(nameRef.current.value);
        setSuccess("Name updated");
      } catch (error) {
        console.log(error);

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
  };

  return (
    <>
      <Card className="w-100">
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
                required
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

      <DeleteAccountModal password={passwordRef} />
    </>
  );
};
