import React, { FormEvent, useRef, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

export const DeleteAccountModal = () => {
  const [show, setShow] = useState(false);
  const { currentUser, deleteAccount, login } = useAuth();
  const [error, setError] = useState("");
  const passwordRef = useRef<any>(null);

  const handleDeleteAccount = async () => {
    try {
      setError("");
      await deleteAccount();
    } catch {
      setError("Error deleting account");
    }
  };

  const pwBeforeDelete = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setError("");
      await login(currentUser.email, passwordRef.current.value);
      handleDeleteAccount();
    } catch {
      setError("Incorrect Password");
    }
  };

  return (
    <div>
      <div className="w-100 text-center mt-2">
        <Button
          onClick={() => {
            setShow(true);
          }}
          variant="link"
        >
          Delete account
        </Button>
      </div>

      <Modal
        centered
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header className="h4" closeButton>
          Delete Account
        </Modal.Header>
        <Modal.Body>
          <Form className="text-center">
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              className="text-center"
              ref={passwordRef}
              minLength={6}
              type="password"
            ></Form.Control>
            <p></p>
            <Button type="submit" onClick={pwBeforeDelete} variant="danger">
              Delete
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
