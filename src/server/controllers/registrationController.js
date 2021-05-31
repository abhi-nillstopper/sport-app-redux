import Registration from "../models/registration";

const RegistrationController = {
  async create(req, res) {
    try {
      const { eventId } = req.params;
      // const { date } = req.body;
      const {
        authData: {
          user: { _id: user_id },
        },
      } = res.locals;

      const registration = await Registration.create({
        // date,
        user: user_id,
        event: eventId,
      });

      await registration
        .populate("event")
        .populate("user", "-password")
        .execPopulate();

      registration.owner = registration.event.user;
      registration.eventTitle = registration.event.title;
      registration.eventPrice = registration.event.price;
      registration.eventDate = registration.event.date;
      registration.userEmail = registration.user.email;
      registration.save();

      //creator of event
      const ownerSocket = req.connectedusers[registration.event.user];

      if (ownerSocket) {
        req.io.to(ownerSocket).emit("registration_request", registration);
      }

      return res.json(registration);
    } catch (err) {
      console.log("error",error)
      return res.status(400).json({ message: "Error while registration" });
    }
  },

  async getRegistration(req, res) {
    try {
      const { registration_id } = req.params;

      const registration = await Registration.findById(registration_id);
      await registration
        .populate("event")
        .populate("user", "-password")
        .execPopulate();

      if (registration) {
        return res.json(registration);
      } else {
        return res.status(400).json({ message: "Registration not found" });
      }
    } catch (err) {
      console.log("error",error)
      return res.status(400).json({ message: "Registration not found" });
    }
  },
  async getMyRequests(req, res) {
    try {
      const {
        authData: {
          user: { _id: user_id },
        },
      } = res.locals;

      const registrationArr = await Registration.find({
        owner: user_id
      });

      if (registrationArr.length > 0) {
        return res.json(registrationArr);
      }
      return res.status(400).json({ message: "Registration not found" });
    } catch (error) {
      console.log("error",error)
      return res.status(400).json({ message: "Registration not found" });
    }
  },
  async getMyParticipation(req, res) {
    try {
      const {
        authData: {
          user: { _id: user_id },
        },
      } = res.locals;

      const ObjectId = require('mongoose').Types.ObjectId;

      const participationArr = await Registration.find({
        user: new ObjectId(user_id),
      });

      if (participationArr.length > 0) {
        return res.json(participationArr);
      }
      return res.status(400).json({ message: "participation not found" });
    } catch (error) {
      console.log("error",error)
      return res.status(400).json({ message: "participation not found" });
    }
  },
};

export default RegistrationController;
