import React, { useState, useContext } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import api from "../../service/api";
import { UserContext } from "../../user-context";
import "./register.css"

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fieldEmpty, setFieldEmpty] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsLoggedIn } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== ""
    ) {
      const response = await api.post("/express/user/register", {
        email,
        password,
        firstName,
        lastName,
      });
      const user_id = response.data.user_id || false;
      const user = response.data.user || false;

      if (user_id && user) {
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("user", user);
        setIsLoggedIn(true);
        history.push("/");
      } else {
        const { message } = response.data;
        errorHandler(message);
      }
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
