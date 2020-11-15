import mongoose from "mongoose";
import { MONGO_DB_NAME, MONGO_DB_URL } from "../env";

const mongodb = (): mongoose.Connection => {
  const url = `${MONGO_DB_URL}/${MONGO_DB_NAME}`;
  mongoose.connect(url, { useNewUrlParser: true });
  return mongoose.connection;
};

export default mongodb;
