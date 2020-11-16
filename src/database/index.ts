import mongoose, { Connection } from "mongoose";
import { MONGO_DB_NAME, MONGO_DB_URL } from "../env";
import { addUserModel, addPlantModel } from "./models";

const connectMongoDB = async (): Promise<Connection> => {
  const url = `${MONGO_DB_URL}/${MONGO_DB_NAME}`;
  let dbClient: Connection;
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    dbClient = mongoose.connection;
    addPlantModel(dbClient);
    addUserModel(dbClient);
    return dbClient;
  } catch (err) {
    console.error("Connection failed:", err);
    dbClient.close();
  }
};

export default connectMongoDB;
