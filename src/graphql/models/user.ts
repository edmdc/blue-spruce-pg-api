import { Connection } from "mongoose";
import bcrypt from "bcrypt";
import { IPlant } from "../dataSources/trefleAPI";
import { RESTDataSource } from "apollo-datasource-rest";

export interface User {
  created: Date;
  _id: string;
  favorites?: IPlant[];
  name: string;
  email: string;
  password?: string;
  __v: number;
  token?: {
    token: string;
    expiration: string;
  };
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
    { models }: Connection,
    dataSources: any
  ): Promise<User> => {
    let user: User, token: any;
    try {
      const encryptedPassword = await encryptPassword(password);
      user = await models.User.create({
        name,
        email,
        password: encryptedPassword,
      });
      token = await dataSources.trefleAPI.getUserToken();
    } catch (error) {
      console.error(error, "in User model");
    }
    return { ...user._doc, token };
  },
  logIn: async (
    email: string,
    password: string,
    { models }: Connection,
    dataSources: any
  ): Promise<User> => {
    let user: User, token: any;
    try {
      user = await models.User.findOne({ email }).exec();
      if (!user) throw new Error("User email does not exists");
      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new Error("Password entry did not match");
      token = await dataSources.trefleAPI.getUserToken();
      console.log();
      return { ...user._doc, token };
    } catch (err) {
      console.error(err);
    }
  },
};

export default User;
