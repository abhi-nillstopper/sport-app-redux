import React, { useEffect, useState, useMemo, useContext } from "react";
import {
  Image,
  Button,
  ButtonGroup,
  Alert,
  SplitButton,
  Dropdown,
  Container,
} from "react-bootstrap";
import moment from "moment";
import { io as socketio } from "socket.io-client";
import "./dashboard.css";
import api from "../../service/api";
import { ReactComponent as DeletIcon } from "../../assets/dustbin.svg";
import { UserContext } from "../../user-context";

//dashboard will shoow all the events
export default function Dashboard({ history }) {
  const radios = [
    { name: "All Sport", value: "" },
    { name: "My Events", value: "myevents" },
    { name: "Running", value: "running" },
    { name: "Cycling", value: "cycling" },
    { name: "Swimming", value: "swimming" },
  ];
  const { setIsLoggedIn } = useContext(UserContext);

  const [events, setEvents] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);
  const [radioValue, setRadioValue] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [registartionRequests, setRegistartionRequests] = useState([]);

  const user_id = localStorage.getItem("user_id");
  // const user = localStorage.getItem("user");

  // useEffect(() => {
  //   isLoggedIn && history.push("/login");
  // }, []);

  useEffect(() => {
    getEvents(radioValue);
  }, [radioValue]);

  const socket = useMemo(
    () => socketio("http://localhost:8000/", { query: { user_id } }),
    [user_id]
  );

  useEffect(() => {
    socket.on("registration_request", (resp) => {
      setRegistartionRequests([...registartionRequests, resp]);
    });
  }, [registartionRequests, socket]);

  const getEvents = async (filter) => {
    try {
      const url = filter
        ? filter === "myevents"
          ? `/express/user/events`
          : `/express/dashboard/${filter}`
        : "/express/dashboard";
      const response = await api.get(url);
      setEvents(response.data.events);
      SetIsLoading(false);

      //disable event dropdown
      document.querySelector(
        `div[name="select-event-dropdown"]`
      ).children[0].disabled = true;
    } catch (error) {
      console.log(error);
      errorHandler(error.message, true);
    }
  };

  const dropDownHandler = (eventKey = "", event = "") => {
    setRadioValue(eventKey);

    document.querySelector(
      `div[name="select-event-dropdown"]`
    ).children[0].innerHTML = event.target.innerHTML;
  };

  const errorHandler = (message, logout = false) => {
    setError(true);
    setErrorMessage(message);
    setTimeout(() => {
      setError(false);
      logout ? logoutHandler() : dropDownHandler();
    }, 2000);
  };

  const logoutHandler = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    history.push("/login");
  };

  const successHandler = (message) => {
    setSuccess(true);
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccess(false);
      getEvents(radioValue);
    }, 2000);
  };

  const handleDelete = async (event_id) => {
    try {
      await api.delete(`/express/event/${event_id}`);
      successHandler("Event deleted successfully");
    } catch (error) {
      errorHandler(error.response.data.message);
    }
  };

  const handleParticipate = async (event) => {
    try {
      await api.post(`/express/registration/${event._id}`, {});
      successHandler(`Participation requested for ${event.title}`);
    } catch (error) {
      errorHandler(error.response.data.message);
    }
  };

  const handleApprove = async (eventId) => {
    try {
      await api.post(`/express/registration/${eventId}/approval`, {});
      successHandler(`Request Approved for ${eventId}`);
      removeNotification(eventId);
    } catch (error) {
      errorHandler(error);
    }
  };
  const handleReject = async (eventId) => {
    try {
      await api.post(`/express/registration/${eventId}/rejection`, {});
      successHandler(`Request Rejected for ${eventId}`);
      removeNotification(eventId);
    } catch (error) {
      errorHandler(error);
    }
  };

  const removeNotification = (eventId) => {
    const newEvents = registartionRequests.filter(
      (request) => request._id !== eventId
    );
    setRegistartionRequests(newEvents);
  };

  return (
    <Container className="dashboard-container">
      {!isLoading ? (
        <>
          <ul className="notification">
            {registartionRequests.map((request) => {
              return (
                <li key={request._id}>
                  <span>
                    <strong>{request.user.email}</strong> is requesting to
                    participate in your event&nbsp;
                    <strong>{request.event.title}</strong> &nbsp;
                  </span>
                  <ButtonGroup>
                    <Button
                      variant="primary"
                      onClick={() => handleApprove(request._id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleReject(request._id)}
                    >
                      Reject
                    </Button>
                  </ButtonGroup>
                </li>
              );
            })}
          </ul>

          {success && (
            <Alert variant="success" className="event-validation">
              {successMessage}
            </Alert>
          )}

          {error && (
            <Alert variant="danger" className="event-validation">
              {errorMessage}
            </Alert>
          )}

          <div className="filter-panel">
            <SplitButton
              variant={"info"}
              name="select-event-dropdown"
              title={"Sport"}
            >
              {radios.map((radio, idx) => (
                <Dropdown.Item
                  key={radio.value}
                  eventKey={radio.value}
                  value={radio.value}
                  active={radio.value === radioValue}
                  onSelect={dropDownHandler}
                >
                  {radio.name}
                </Dropdown.Item>
              ))}
            </SplitButton>
            {/* <ButtonGroup toggle>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="info"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              // active={radioValue === radio.value}
              onChange={(e) => radioHandler(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup> */}
          </div>
          <ul className="events-list">
            {events.map((event) => {
              return (
                <li key={event._id}>
                  <header>
                    {event.user === user_id && (
                      <div>
                        <DeletIcon onClick={() => handleDelete(event._id)} />
                      </div>
                    )}
                    <Image src={event.thumbnail_url}></Image>
                  </header>
                  <strong>{event.title}</strong>
                  <span>
                    Event Date: {moment(event.date).format("DD,MMM,YY")}
                  </span>
                  <span>Event Sport: {event.sport}</span>
                  <span>
                    Event Price: (in ₹) {parseFloat(event.price).toFixed(2)}
                  </span>
                  <span>Event Description: {event.description}</span>
                  <Button
                    variant="primary"
                    onClick={() => handleParticipate(event)}
                  >
                    Participate
                  </Button>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}
