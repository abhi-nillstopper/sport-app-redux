import mongoose from "mongoose";
import Registration from "./registration";

const EventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    date: Date,
    sport: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

EventSchema.virtual("thumbnail_url").get(function () {
  return this.thumbnail;
});

EventSchema.pre("deleteOne", { document: false, query: true }, function (next) {
  const _id = this.getFilter()["_id"];
  if (typeof _id !== "undefined") {
    Registration.deleteMany({ event: _id }, next);
  }
  next();
});

const Event = mongoose.model("Event", EventSchema);
export default Event;
