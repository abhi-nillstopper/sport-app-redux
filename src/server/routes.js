import express from "express";
import multer from "multer";
import UserController from "./controllers/userController";
import EventController from "./controllers/eventController";
import DashboardController from "./controllers/dashboardController";
import LoginController from "./controllers/loginController";
import RegistrationController from "./controllers/registrationController";
import ApprovalController from "./controllers/approvalController";
import RejectionController from "./controllers/rejectionController";
import { verifyToken } from "./middleware/verifyToken";

// import UploadConfig from "./config/upload";
import UploadConfigS3 from "./config/s3_upload";

const routes = express.Router();

//* for local file save in file folder
//* const upload = multer(UploadConfig);

//* config for saving file in AWS s3
const uploadS3 = multer(UploadConfigS3);

routes.get("/express/status", (req, res) => {
  res.status(200).send({ status: 200 });
});

//login
routes.post("/express/login", LoginController.authenticateUser);

//registration
routes.post(
  "/express/registration/:eventId",
  verifyToken,
  RegistrationController.create
);
routes.get(
  "/express/registration",
  verifyToken,
  RegistrationController.getMyRequests
);
routes.get(
  "/express/registration/:registration_id",
  RegistrationController.getRegistration
);

//participation
routes.get(
  "/express/participation",
  verifyToken,
  RegistrationController.getMyParticipation
);

//approval
routes.post(
  "/express/registration/:registration_id/approval",
  verifyToken,
  ApprovalController.approval
);

//rejection
routes.post(
  "/express/registration/:registration_id/rejection",
  verifyToken,
  RejectionController.rejection
);

//dashboard
routes.get("/express/dashboard", verifyToken, DashboardController.getAllEvent);
routes.get(
  "/express/dashboard/:sport",
  verifyToken,
  DashboardController.getAllEvent
);
routes.get(
  "/express/user/events",
  verifyToken,
  DashboardController.getAllEventByUserId
);
routes.get(
  "/express/event/:eventId",
  verifyToken,
  DashboardController.getEventById
);

//Event
routes.post(
  "/express/event",
  verifyToken,
  uploadS3.single("thumbnail"),
  EventController.createEvent
);
routes.delete(
  "/express/event/:eventId",
  verifyToken,
  EventController.deleteEventById
);

//User
routes.get("/express/user/:userId", UserController.getUserById);
routes.post("/express/user/register", UserController.createUser);

//default
routes.get("*", function (req, res) {
  res.redirect("/");   
});

export default routes;
