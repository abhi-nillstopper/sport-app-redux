import React from "react";
import propType from "prop-types";
// import { withRouter } from "react-router-dom";
import withRouter from "../../wrapper/with_router";
import { bindActionCreators } from "redux";
import {
  Form,
  Button,
  Container,
  Alert,
  Dropdown,
  SplitButton,
} from "react-bootstrap";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import { ReactComponent as CameraIcon } from "../../assets/camera.svg";
import { createEvents, changeSuccess } from "../../actions/event_action";
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
      hasError: false,
    };

    // this.handleOnChange = this.handleOnChange.bind(this);
    autoBind(this);
  }

  componentDidMount() {
    if (!this.user) {
      // this.props.history.push("/login");
      this.props.navigate("/login");
    } else {
      const sportDropDown = document.querySelector(
        `div[name="sport-dropdown"]`
      );
      if (sportDropDown) {
        sportDropDown.children[0].disabled = true;
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.success !== prevState.success) {
      return { success: nextProps.success };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let { thumbnail, success } = this.state;

    if (prevState.thumbnail !== thumbnail) {
      this.setState({
        preview: thumbnail ? URL.createObjectURL(thumbnail) : null,
      });
    }

    if (success) {
      setTimeout(() => {
        this.props.changeSuccess(false);
        // this.props.history.push("/");
        this.props.navigate("/");
      }, 2000);
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log("error: ", error, "errorInfo: ", errorInfo);
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
        this.props.createEvents(eventData);
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
    const { navigate } = this.props;
    let {
      date,
      description,
      price,
      thumbnail,
      title,
      preview,
      fieldEmpty,
      success,
      hasError,
    } = this.state;
    return (
      <Container className="new-event-container">
        {hasError ? (
          <>
            <h1>Error in page</h1>
          </>
        ) : (
          <React.Fragment>
            <h2>Create your event</h2>
            <Form onSubmit={this.submitHandler}>
              <Form.Group className="form-group" controlId="formBasicThumbnail">
                <Form.Label>Upload Image:</Form.Label>
                <Form.Label
                  id="thumbnail"
                  style={{
                    backgroundImage: `url(${preview})`,
                    backgroundSize: "cover",
                  }}
                  className={thumbnail ? "has-thumbnail" : ""}
                >
                  <Form.Control
                    type="file"
                    name="thumbnail"
                    onChange={this.handleOnChange}
                  />
                  {!preview && <CameraIcon />}
                </Form.Label>
              </Form.Group>

              <Form.Group className="form-group" controlId="formBasicTitle">
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={title}
                  placeholder="Enter Title"
                  onChange={this.handleOnChange}
                />
              </Form.Group>

              <Form.Group
                className="form-group"
                controlId="formBasicDescription"
              >
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={description}
                  placeholder="Enter Description"
                  onChange={this.handleOnChange}
                />
              </Form.Group>
              <Form.Group className="form-group" controlId="formBasicPrice">
                <Form.Label>Price:</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={price}
                  placeholder="Enter Price in ₹"
                  onChange={this.handleOnChange}
                />
              </Form.Group>

              <Form.Group className="form-group" controlId="formBasicDate">
                <Form.Label>Date:</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={date}
                  placeholder="Enter Date"
                  onChange={this.handleOnChange}
                />
              </Form.Group>
              <Form.Group className="form-group" controlId="formBasicSport">
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
              <Form.Group className="form-group" controlId="formBasicSubmit">
                <Button
                  variant="primary"
                  type="submit"
                  className="full-width-btn"
                >
                  Create Event
                </Button>
              </Form.Group>
              <Form.Group className="form-group" controlId="formBasicDashboard">
                <Button
                  variant="danger"
                  onClick={() => navigate("/")}
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
          </React.Fragment>
        )}
      </Container>
    );
  }
}

EventPage.propType = {
  success: propType.bool,
  changeSuccess: propType.func,
  createEvents: propType.func,
  navigate: propType.any,
};

const mapStateToProps = (state) => ({
  success: state.event.success,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ createEvents, changeSuccess }, dispatch),
  };
}

// export default connect(mapStateToProps, {createEvents} )(withRouter(EventPage))

// or

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EventPage));

export const PureEventPage = EventPage;
// export default EventPage;

// export default withRouter(EventPage);
