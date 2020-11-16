import { Schema, Connection } from "mongoose";
import applyUserMiddleware from "../controller/users";
import { plantSchema } from "./Plant";

export const userSchema = new Schema({
  created: { type: Date, default: Date.now() },
  defaultLocation: String,
  favorites: {
    type: [plantSchema],
    default: undefined,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default (conn: Connection): Connection => {
  applyUserMiddleware(userSchema);
  conn.model("User", userSchema);
  return conn;
};
