import React, { useContext } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as SportHome } from "../../assets/sports_mode.svg";
// import { UserContext } from "../../user-context";
import { logoutHandler } from "../../actions/authentication_action";
import "./top_navigation.css";

export default function TopNavigation(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => {
    return state.authentication.isLoggedIn;
  });

  // const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const handleLogout = async () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user");
    await dispatch(logoutHandler());
    navigate("/login");
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
                  <NavLink
                    // activeClassName="active-nav-link"
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : ""
                    }
                    to="/"
                    end
                  >
                    Dashboard
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : ""
                    }
                    to="/events"
                  >
                    New Event
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : ""
                    }
                    to="/myparticipation"
                  >
                    My Participation
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : ""
                    }
                    to="/myrequests"
                  >
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
