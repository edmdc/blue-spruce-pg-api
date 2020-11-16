import { Schema, model } from "mongoose";

export const plantSchema = new Schema({
  _id: { type: Number, required: true },
  commonName: String,
  scientificName: String,
});

export default model("Plant", plantSchema);
