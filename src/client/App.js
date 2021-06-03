import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./routes";
// import { ContextWrapper } from "./user-context";

function App() {
  return (
    // <ContextWrapper>
    <Provider store={store}>
      <Container className="root-container">
        <Routes />
      </Container>
    </Provider>
    // </ContextWrapper>
  );
}

export default App;
