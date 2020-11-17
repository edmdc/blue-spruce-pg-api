import { plantCatalog } from "./plants";
import { userSignUp, userLogIn } from "./user";
import { EmailAddressResolver, URLResolver } from "graphql-scalars";

const resolvers = {
  EmailAddress: EmailAddressResolver,
  URL: URLResolver,
  Query: {
    plantCatalog,
    userLogIn,
  },
  Mutation: {
    userSignUp,
  },
};

export default resolvers;
