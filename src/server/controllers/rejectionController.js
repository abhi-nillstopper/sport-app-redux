import Registration from "../models/registration";

const RejectionController = {
  async rejection(req, res) {
    try {
      const { registration_id } = req.params;
      const registration = await Registration.findById(registration_id);

      if (registration) {
        registration.approved = false;

        await registration.save();

        return res.json(registration);
      }
      return res.status(400).send("Registration not found");

    } catch (error) {
      return res.status(404).send(error);
    }
  },
};

export default RejectionController;
