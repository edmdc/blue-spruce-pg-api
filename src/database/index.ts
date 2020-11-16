import mongoose, { Connection } from "mongoose";
import { MONGO_DB_NAME, MONGO_DB_URL } from "../env";

const mongodb = async (): Promise<Connection> => {
  const url = `${MONGO_DB_URL}/${MONGO_DB_NAME}`;
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    })
    .catch((err) => console.log(err.reason));
  return mongoose.connection;
};

export default mongodb;
