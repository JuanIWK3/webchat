/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export const Signup = () => {
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const passwordConfirmRef = useRef<any>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordConfirmRef.current.value);
      setSuccess("Account Created");
    } catch (error) {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  return (
    <>
      <Card className="w-100">
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2" id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
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
            <Form.Group className="mb-2" id="password-confirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                minLength={6}
                type="password"
                ref={passwordConfirmRef}
                required
              />
            </Form.Group>
            <Button
              disabled={loading}
              className="w-100 text-center mt-2"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};
