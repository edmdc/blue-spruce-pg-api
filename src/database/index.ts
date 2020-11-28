import mongoose, { Connection } from "mongoose";
import { MONGO_DB_URL } from "../env";
import { addUserModel, addPlantModel } from "./models";

const connectMongoDB = async (): Promise<Connection> => {
  const url = MONGO_DB_URL;
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
    dbClient.close();
    console.error("Connection failed:", err);
  }
};

export default connectMongoDB;
