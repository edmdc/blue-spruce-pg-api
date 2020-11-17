import { User } from "../models/user";

type ArgTypes = {
  name?: string;
  password?: string;
  email?: string;
};

export const userSignUp = async (
  _sources: any,
  { name, email, password }: ArgTypes,
  { models, db }: any
): Promise<User> => {
  return models.User.signUp(name, email, password, db);
};

export const userLogIn = async (
  _sources: any,
  { email, password }: ArgTypes,
  { models, db }: any
): Promise<User> => {
  return models.User.signUp(email, password, db);
};
