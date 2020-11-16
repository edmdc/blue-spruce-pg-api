import mongoose, { Connection } from "mongoose";
import { MONGO_DB_NAME, MONGO_DB_URL } from "../env";
import { addUserModel, addPlantModel } from "./models";

const mongodb = async (): Promise<Connection> => {
  const url = `${MONGO_DB_URL}/${MONGO_DB_NAME}`;
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    })
    .catch((err) => console.log(err.reason));
  const dbClient = mongoose.connection;
  addUserModel(dbClient);
  addPlantModel(dbClient);
  return dbClient;
};

export default mongodb;
