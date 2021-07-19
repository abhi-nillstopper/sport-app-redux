import mongoose from "mongoose";
import Registration from "./registration";
import { s3Bucket } from "../config/s3_upload";

const EventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    s3_object_key: String,
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

EventSchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function (next) {
    const _id = this.getFilter()["_id"];
    if (typeof _id !== "undefined") {
      const event = await Event.findById(_id);
      if (event) {
        s3Bucket.deleteObject(
          { Bucket: "sport-app-mern", Key: event.s3_object_key },
          (err, res) => {
            if (!err) {
              console.log("s3 object deleted successfully", res);
            } else {
              console.log("error in deleting s3 object", err);
            }
          }
        );
      }

      Registration.deleteMany({ event: _id }, next);
    }
    next();
  }
);

const Event = mongoose.model("Event", EventSchema);
export default Event;
