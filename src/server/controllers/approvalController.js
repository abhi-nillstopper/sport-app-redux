import Registration from "../models/registration";

const ApprovalController = {
  async approval(req, res) {
    try {
      const { registration_id } = req.params;

      const registration = await Registration.findById(registration_id);

      if (registration) {
        registration.approved = true;

        await registration.save();

        return res.json(registration);
      }
      return res.status(400).send("Registration not found");
    } catch (error) {
      return res.status(404).send(error);
    }
  },
};

export default ApprovalController;
