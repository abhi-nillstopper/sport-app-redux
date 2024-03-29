import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import { useSelector, useDispatch } from "react-redux";
// import { UserContext } from "../../user-context";
import { loginHandler } from "../../actions/authentication_action";
import "./login.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const isLoggedIn = useSelector((state) => {
    return state.authentication.isLoggedIn;
  });

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post("/express/login", { email, password });
    const user_id = response.data.user_id || false;
    const user = response.data.user || false;

    try {
      if (user_id) {
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("user", user);
        await dispatch(loginHandler());
        // setIsLoggedIn(true);
        navigate("/");
      } else {
        const { message } = response.data;
        errorHandler(message);
      }
    } catch (err) {
      errorHandler("Error, server returned the error");
    }
  };

  const errorHandler = (message) => {
    setError(true);
    setErrorMessage(message);
    setTimeout(() => setError(false), 2000);
  };

  return (
    <Container className="login-container">
      <h2>Login:</h2>
      <p>
        Please <strong>login</strong> to your account
      </p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group" controlId="formBasicEmail">
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

        <Form.Group className="form-group" controlId="formBasicPassword">
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
        <Form.Group className="form-group" controlId="formBasicSubmit">
          <Button variant="primary" type="submit" className="full-width-btn">
            Login
          </Button>
        </Form.Group>
        <Form.Group className="form-group" controlId="formBasicNewAccount">
          <Button
            variant="secondary"
            className="full-width-btn"
            onClick={() => navigate("/register")}
          >
            Create New Account
          </Button>
        </Form.Group>
      </Form>
      {error ? (
        <Alert variant="danger" className="event-validation">
          {errorMessage}
        </Alert>
      ) : (
        <></>
      )}
    </Container>
  );
}
