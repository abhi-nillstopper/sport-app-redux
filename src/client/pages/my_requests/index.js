import React, { useState, useEffect } from "react";
import moment from "moment";
import api from "../../service/api";
import { Button, ButtonGroup, Alert, Container } from "react-bootstrap";
import "./my_requests.css";

export default function MyRequests() {
  const [myRequests, setMyRequests] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getMyRequests();
  }, []);

  const getMyRequests = async () => {
    try {
      const response = await api.get("/express/registration");
      setMyRequests(response.data);
    } catch (error) {
      setError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const isApproved = (approved) =>
    approved === true ? "Approved" : "Rejected";

  const handleApprove = async (eventId) => {
    try {
      await api.post(`/express/registration/${eventId}/approval`, {});
      successHandler(`Request Approved for ${eventId}`);
    } catch (error) {
      errorHandler(error);
    }
  };
  const handleReject = async (eventId) => {
    try {
      await api.post(`/express/registration/${eventId}/rejection`, {});
      successHandler(`Request Rejected for ${eventId}`);
    } catch (error) {
      errorHandler(error);
    }
  };

  const errorHandler = (message, logout = false) => {
    setError(true);
    setErrorMessage(message);
    setTimeout(() => {
      setError(false);
      // getMyRequests();
      //   logout ? logoutHandler() : dropDownHandler();
    }, 2000);
  };

  const successHandler = (message) => {
    setSuccess(true);
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccess(false);
      getMyRequests();
    }, 2000);
  };

  return (
    <Container className="myregistration-container">
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
      <ul className="my-events">
        {myRequests.map((event) => (
          <li key={event._id}>
            <div>
              <strong>{event.eventTitle}</strong>
            </div>
              <span>
                Event Date: {moment(event.eventDate).format("DD,MMM,YY")}
              </span>
              <span>
                Event Price: ₹{parseFloat(event.eventPrice).toFixed(2)}
              </span>
              <span>User Email: {event.userEmail}</span>
              <span>
                Status:
                <span
                  className={
                    event.approved !== undefined
                      ? isApproved(event.approved)
                      : "Pending"
                  }
                >
                  {event.approved !== undefined
                    ? isApproved(event.approved)
                    : "Pending"}
                </span>
              </span>
            <ButtonGroup>
              <Button
                variant="primary"
                disabled={
                  event.approved === true || event.approved === false
                    ? true
                    : false
                }
                onClick={() => handleApprove(event._id)}
              >
                Approve
              </Button>
              <Button
                variant="danger"
                disabled={
                  event.approved === true || event.approved === false
                    ? true
                    : false
                }
                onClick={() => handleReject(event._id)}
              >
                Reject
              </Button>
            </ButtonGroup>
          </li>
        ))}
      </ul>
    </Container>
  );
}
