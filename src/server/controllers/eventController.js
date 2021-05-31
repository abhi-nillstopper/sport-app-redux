import Event from "../models/event";
import User from "../models/user";

const EventController = {
  async createEvent(req, res) {
    const { title, description, price, sport, date } = req.body;
    //* const { user_id } = req.headers;
    //* nested destructuring: user_id = authData.user._id
    const {
      authData: {
        user: { _id: user_id },
      },
    } = res.locals;
    const { location } = req.file;

    const userById = await User.findById(user_id);

    if (!userById) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }

    const event = await Event.create({
      title,
      description,
      price: parseFloat(price),
      user: user_id,
      sport,
      thumbnail: location,
      date,
    });

    return res.json(event);
  },

  async deleteEventById(req, res) {
    const { eventId } = req.params;
    try {
      await Event.deleteOne({ _id: eventId });
      return res.status(204).send();
    } catch (error) {
      return res
        .status(400)
        .json({ message: `We don't have Event with id! ${eventId}` });
    }
  },
};

export default EventController;
