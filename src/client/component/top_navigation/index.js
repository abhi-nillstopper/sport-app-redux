import React, { useContext } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import { ReactComponent as SportHome } from "../../assets/sports_mode.svg";
import { UserContext } from "../../user-context";
import "./top_navigation.css";

export default function TopNavigation(props) {
  const history = useHistory();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    history.push("/login");
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="top-navigation-bar">
          <Navbar bg="light" expand="lg">
            {/* <Navbar.Brand href="/">Sports App</Navbar.Brand> */}
            <span>
              <Link to="/">
                <SportHome />
                <span> Sport App</span>
              </Link>
            </span>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Item>
                  <NavLink activeClassName="active-nav-link" to="/" exact>
                    Dashboard
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink activeClassName="active-nav-link" to="/events">
                    New Event
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    activeClassName="active-nav-link"
                    to="/myparticipation"
                  >
                    My Participation
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink activeClassName="active-nav-link" to="/myrequests">
                    My Requests
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <Button variant="danger" onClick={handleLogout}>
                    Logout
                  </Button>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      ) : (
        <></>
      )}
      <div className="content">{props.children}</div>
    </>
  );
}
