import { Connection } from "mongoose";
import bcrypt from "bcrypt";

const User = {
  signUp: async (
    name: string,
    email: string,
    password: string,
    { models }: Connection
  ): Promise<Promise<void>> => {
    let user;
    try {
      bcrypt.hash(password, 10, async (err, passwordHash) => {
        if (err) return console.error(err);
        user = await models.User.create({
          name,
          email,
          password: passwordHash,
        });
        console.log(user);
      });
    } catch (error) {
      console.log(error, "in User model");
    }
    return user;
  },
};

export default User;
