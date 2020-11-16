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
  console.log(models);
  try {
    const user = await models.User.signUp(name, email, password, db);
    return user;
  } catch (err) {
    console.log(err);
  }
};
