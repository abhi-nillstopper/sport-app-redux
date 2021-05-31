import Event from "../models/event";

const dashboardController = {
  async getEventById(req, res) {
    const { authData } = res.locals;
    const { eventId } = req.params;
    try {
      const event = await Event.findById(eventId);

      if (event) {
        return res.json({ authData, event });
      } else {
        return res
          .status(404)
          .json({ message: `EventId: ${eventId} does not exist! ` });
      }
    } catch (error) {
      return res.status(400).json({ message: "EventId does not exist!" });
    }
  },
  async getAllEventByUserId(req, res) {
    const {authData,
      authData: {
        user: { _id: user_id },
      },
    } = res.locals;

    try {
      const events = await Event.find({ user: user_id });

      if (events) {
        return res.json({authData, events});
      }
    } catch (error) {
      return res
        .status(400)
        .json({ message: `We do not have any events with user ${user_id}` });
    }
  },

  async getAllEvent(req, res) {
    const { sport } = req.params;
    const { authData } = res.locals;
    const query = sport ? { sport } : {};
    try {
      const events = await Event.find(query);

      if (events) {
        return res.json({ authData, events });
      }
    } catch (error) {
      return res.status(400).json({ message: "We do not have any events yet" });
    }
  },
};

export default dashboardController;
