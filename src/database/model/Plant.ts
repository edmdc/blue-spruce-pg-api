import { Schema } from "mongoose";

export const PlantSchema = new Schema({
  id: { type: Number, required: true },
  commonName: String,
  scientificName: String,
});
