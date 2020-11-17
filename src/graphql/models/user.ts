import { Connection } from "mongoose";
import bcrypt from "bcrypt";

const encryptPassword = async (pass: string): Promise<string> => {
  let password: string;
  bcrypt.hash(pass, 10, (err, hashedPassword) => {
    if (err) throw new Error("Couldn't encrypt password");
    password = hashedPassword;
  });
  return password;
};

const User = {
  signUp: async (
    name: string,
    email: string,
    password: string,
    { models }: Connection
  ): Promise<Promise<void>> => {
    let user;
    try {
      const encryptedPassword = await encryptPassword(password);
      user = await models.User.create({
        name,
        email,
        password: encryptedPassword,
      });
      console.log(user, "in user model");
    } catch (error) {
      console.log(error, "in User model");
    }
    return user;
  },
};

export default User;
