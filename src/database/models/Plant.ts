import { Schema, Connection } from "mongoose";

export const plantSchema = new Schema({
  _id: { type: Number, required: true },
  commonName: String,
  scientificName: String,
});

export default (conn: Connection): Connection => {
  conn.model("Plant", plantSchema);
  return conn;
};
