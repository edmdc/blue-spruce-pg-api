import { Schema } from "mongoose";
import { PlantSchema } from "./Plant";

export const userSchema = new Schema({
  defaultLocation: String,
  favorites: [PlantSchema],
  name: String,
  email: String,
  password: String,
});
