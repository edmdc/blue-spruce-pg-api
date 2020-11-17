type ArgTypes = {
  name: string;
  password: string;
  email: string;
};

export const userSignUp = async (
  _sources: any,
  { name, email, password }: ArgTypes,
  { models, db }: any
): Promise<void> => {
  let user;
  try {
    user = await models.User.signUp(name, email, password, db);
    console.log(user);
    return user;
  } catch (err) {
    console.log(err);
  }
  return user;
};
