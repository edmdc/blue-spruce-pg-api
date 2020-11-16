import { Connection } from "mongoose";

const User = {
  signUp: async (
    name: string,
    email: string,
    password: string,
    { models }: Connection
  ): Promise<void> => {
    models.User.create({ name, email, password });
  },
};

export default User;
