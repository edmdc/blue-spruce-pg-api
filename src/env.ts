import Dotenv from "dotenv";

Dotenv.config();

export const { TREFFLE_API_KEY, MONGO_DB_URL, MONGO_DB_NAME } = process.env;
