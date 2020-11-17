import { Connection } from "mongoose";
import bcrypt from "bcrypt";
import { PlantInfo } from "../dataSources/treffleAPI";

export interface User {
  _id: string;
  favorites?: PlantInfo[];
  name: string;
  email: string;
  password?: string;
}

const encryptPassword = async (pass: string): Promise<string> => {
  let password: string;
  try {
    password = await bcrypt.hash(pass, 10);
  } catch (err) {
    throw new Error("Couldn't encrypt password");
  }
  return password;
};

const User = {
  signUp: async (
    name: string,
    email: string,
    password: string,
    { models }: Connection
  ): Promise<User> => {
    let user: User;
    try {
      const encryptedPassword = await encryptPassword(password);
      user = await models.User.create({
        name,
        email,
        password: encryptedPassword,
      });
    } catch (error) {
      console.error(error, "in User model");
    }
    return user;
  },
};

export default User;
