import React from "react";
import { withRouter } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Image,
  Alert,
  Dropdown,
  SplitButton,
} from "react-bootstrap";
import api from "../../service/api";
import autoBind from "react-autobind";
import {ReactComponent as CameraIcon} from "../../assets/camera.svg";
import "./events.css";

//Create Event
class EventPage extends React.Component {
  user_id;
  user;
  dropDownItems;
  constructor(props) {
    super(props);
    this.user_id = localStorage.getItem("user_id");
    this.user = localStorage.getItem("user");
    this.dropDownItems = [
      { key: "running", itemName: "Running" },
      { key: "cycling", itemName: "Cycling" },
      { key: "swimming", itemName: "Swimming" },
    ];
    this.state = {
      title: "",
      description: "",
      price: "",
      thumbnail: null,
      date: "",
      sport: "",
      preview: null,
      fieldEmpty: false,
      success: false,
    };

    // this.handleOnChange = this.handleOnChange.bind(this);
    autoBind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("user", this.user)
  //   if (!this.user) {
  //     this.props.history.push("/login");
  //     return false;
  //   }
  //   return true;
  // }

  componentDidMount() {
    if (!this.user) {
      this.props.history.push("/login");
    } else {
      document.querySelector(
        `div[name="sport-dropdown"]`
      ).children[0].disabled = true;
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let { thumbnail } = this.state;
    if (prevState.thumbnail !== thumbnail) {
      this.setState({
        preview: thumbnail ? URL.createObjectURL(thumbnail) : null,
      });
    }
  }

  async submitHandler(e) {
    e.preventDefault();
    let {
      date,
      description,
      price,
      sport,
      thumbnail,
      title,
      // success,
    } = this.state;
    const eventData = new FormData();
    eventData.append("title", title);
    eventData.append("description", description);
    eventData.append("price", price);
    eventData.append("thumbnail", thumbnail);
    eventData.append("date", date);
    eventData.append("sport", sport);

    try {
      if (
        title !== "" &&
        description !== "" &&
        price !== "" &&
        thumbnail !== null &&
        date !== "" &&
        sport !== ""
      ) {
        await api.post("/express/event", eventData);
        this.setState({ success: true });
        setTimeout(() => {
          this.setState({ success: false });
          this.props.history.push("/");
        }, 2000);
      } else {
        this.setState({ fieldEmpty: true });
        setTimeout(() => this.setState({ fieldEmpty: false }), 2000);
      }
    } catch (err) {
      console.log(err);
      Promise.reject(err);
    }
    return;
  }

  handleOnChange(e) {
    if (!e.target.files) {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      this.setState({ [e.target.name]: e.target.files[0] });
    }
    // setTimeout(()=> console.log(this.state),1000)
  }

  onSelectSport(eventKey, evt) {
    this.setState({ sport: eventKey });
    document.querySelector(`div[name="sport-dropdown"]`).children[0].innerHTML =
      evt.target.innerHTML;
  }

  render() {
    const { history } = this.props;
    let {
      date,
      description,
      price,
      thumbnail,
      title,
      preview,
      fieldEmpty,
      success,
    } = this.state;
    return (
      <Container className="new-event-container">
        <h2>Create your event</h2>
        <Form onSubmit={this.submitHandler}>
          <Form.Group controlId="formBasicThumbnail">
            <Form.Label>Upload Image:</Form.Label>
            <Form.Label
              id="thumbnail"
              style={{ backgroundImage: `url(${preview})` }}
              className={thumbnail ? "has-thumbnail" : ""}
            >
              <Form.File name="thumbnail" onChange={this.handleOnChange} />
              <CameraIcon/>
            </Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              placeholder="Enter Title"
              onChange={this.handleOnChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={description}
              placeholder="Enter Description"
              onChange={this.handleOnChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPrice">
            <Form.Label>Price:</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={price}
              placeholder="Enter Price in ₹"
              onChange={this.handleOnChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicDate">
            <Form.Label>Date:</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={date}
              placeholder="Enter Date"
              onChange={this.handleOnChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicSport">
            {/* <Form.Label>Sport:</Form.Label> */}
            <SplitButton
              variant={"secondary"}
              name="sport-dropdown"
              title={"Sport"}
            >
              <Dropdown.Item eventKey="1" disabled>
                Select Sport
              </Dropdown.Item>
              <Dropdown.Divider />
              {this.dropDownItems.map((drpdwn, idx) => {
                return (
                  <Dropdown.Item
                    key={idx}
                    eventKey={drpdwn.key}
                    onSelect={this.onSelectSport}
                  >
                    {drpdwn.itemName}
                  </Dropdown.Item>
                );
              })}
            </SplitButton>
          </Form.Group>
          <Form.Group controlId="formBasicSubmit">
            <Button variant="primary" type="submit" className="full-width-btn">
              Create Event
            </Button>
          </Form.Group>
          <Form.Group controlId="formBasicDashboard">
            <Button
              variant="danger"
              onClick={() => history.push("/")}
              title="Dashboard"
              className="full-width-btn"
            >
              Cancel
            </Button>
          </Form.Group>
        </Form>
        {fieldEmpty ? (
          <Alert variant="danger" className="event-validation">
            missing required fields
          </Alert>
        ) : (
          <></>
        )}
        {success ? (
          <Alert variant="success" className="event-validation">
            Event created
          </Alert>
        ) : (
          <></>
        )}
      </Container>
    );
  }
}

export default withRouter(EventPage);
