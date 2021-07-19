import mongoose from "mongoose";
import Registration from "./registration";
import {s3Bucket} from "../config/s3_upload"

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
    // let awsImgUrl;
    // console.log("_id",_id);
    // const event = Event.findById(_id);
    // if(event){
    //   awsImgUrl = event.thumbnail;
    //   s3Bucket.deleteObject({Bucket: "sport-app-mern", Key})
    // }
    
    Registration.deleteMany({ event: _id }, next);
  }
  next();
});

const Event = mongoose.model("Event", EventSchema);
export default Event;
