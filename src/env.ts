import Dotenv from "dotenv";

Dotenv.config();

export const { TREFLE_API_KEY, MONGO_DB_URL, PORT } = process.env;
