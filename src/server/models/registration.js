import * as mongoose from "mongoose";

const RegistrationSchema = mongoose.Schema({
  date: () => Date.now(),
  approved: Boolean,
  owner: String,
  eventTitle: String,
  eventPrice: String,
  userEmail: String,
  eventDate: String,
  // sport: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
});

const Registration = mongoose.model("Registration", RegistrationSchema);
export default Registration;
