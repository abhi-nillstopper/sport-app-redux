import React, { useState, useEffect } from "react";
import moment from "moment";
import api from "../../service/api";
import { Alert, Container } from "react-bootstrap";

export default function MyParticipation() {
  const [myEvents, setMyEvents] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getMyParticipation();
  }, []);

  const getMyParticipation = async () => {
    try {
      const response = await api.get("/express/participation");
      setMyEvents(response.data);
    } catch (error) {
      setError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const isApproved = (approved) =>
    approved === true ? "Approved" : "Rejected";

  return (
    <Container className="myregistration-container">
      {error && (
        <Alert variant="danger" className="event-validation">
          {errorMessage}
        </Alert>
      )}
      <ul className="my-events">
        {myEvents.map((event) => (
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
          </li>
        ))}
      </ul>
    </Container>
  );
}
