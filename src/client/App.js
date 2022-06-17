import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Provider } from "react-redux";
import store from "./store";
import AppRoutes from "./app_routes";
// import { ContextWrapper } from "./user-context";

function App() {
  return (
    // <ContextWrapper>
    <Provider store={store}>
      <Container className="root-container">
        <AppRoutes />
      </Container>
    </Provider>
    // </ContextWrapper>
  );
}

export default App;
