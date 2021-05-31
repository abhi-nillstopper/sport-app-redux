import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Routes from "./routes";
import { ContextWrapper } from "./user-context";

function App() {
  return (
    <ContextWrapper>
      <Container className="root-container">
        <Routes />
      </Container>
    </ContextWrapper>
  );
}

export default App;
