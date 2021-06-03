import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../actions/register_action";
import { loginHandler } from "../../actions/authentication_action";

import "./register.css";

export default function Register({ history }) {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => {
    return state.authentication.isLoggedIn;
  });

  const response = useSelector((state) => {
    return state.register.response;
  });

  useEffect(() => {
    isLoggedIn && history.push("/");
  }, [isLoggedIn]);

  useEffect(async () => {
    if (
      Object.keys(response).length > 0 &&
      Object.keys(response.data).length > 0
    ) {
      const user_id = response.data.user_id || false;
      const user = response.data.user || false;

      if (user_id && user) {
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("user", user);
        await dispatch(loginHandler());
        history.push("/");
      } else {
        const { message } = response.data;
        errorHandler(message);
      }
    }
  }, [response]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fieldEmpty, setFieldEmpty] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== ""
    ) {
      let payload = {
        email,
        password,
        firstName,
        lastName,
      };

      await dispatch(registerUser(payload));
    } else {
      errorHandler("You need to fill all the inputs");
    }
  };

  const errorHandler = (message) => {
    setFieldEmpty(true);
    setErrorMessage(message);
    setTimeout(() => setFieldEmpty(false), 2000);
  };

  return (
    <Container className="register-container">
      <h2>Register:</h2>
      <p>
        Please <strong>register</strong> for your account
      </p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="Enter firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Enter lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Form.Group controlId="formBasicSubmit">
          <Button variant="primary" type="submit" className="full-width-btn">
            Submit
          </Button>
        </Form.Group>
        <Form.Group controlId="formBasicLogin">
          <Button
            variant="secondary"
            onClick={() => history.push("/login")}
            className="full-width-btn"
          >
            Login
          </Button>
        </Form.Group>
      </Form>
      {fieldEmpty ? (
        <Alert variant="danger" className="event-validation">
          {errorMessage}
        </Alert>
      ) : (
        <></>
      )}
    </Container>
  );
}
