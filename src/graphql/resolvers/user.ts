type ArgTypes = {
  name: string;
  password: string;
  email: string;
};

export const signUp = async (
  _sources: any,
  { name, email, password }: ArgTypes,
  { models, db }: any
): Promise<void> => {
  return models.User.signUp(name, email, password, db);
};
