import { Connection } from "mongoose";
import bcrypt from "bcrypt";

const User = {
  signUp: async (
    name: string,
    email: string,
    password: string,
    { models }: Connection
  ): Promise<void> => {
    bcrypt.hash(password, 10, (err, passwordHash) => {
      if (err) return console.error(err);
      models.User.create({ name, email, passwordHash });
    });
  },
};

export default User;
