import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import { plantSchema } from "./Plant";

export const userSchema = new Schema({
  _id: ObjectId,
  created: { type: Date, default: Date.now() },
  defaultLocation: String,
  favorites: {
    type: [plantSchema],
    default: undefined,
  },
  name: String,
  email: String,
  password: String,
});

export default model("User", userSchema);
