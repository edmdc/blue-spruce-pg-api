import { ObjectId } from "mongodb";
import { Schema, Connection } from "mongoose";
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

export default (conn: Connection): Connection => {
  conn.model("User", userSchema);
  return conn;
};
