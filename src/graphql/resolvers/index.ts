import { plantCatalog } from "./plants";
import { userSignUp } from "./user";
import { EmailAddressResolver, URLResolver } from "graphql-scalars";

const resolvers = {
  EmailAddress: EmailAddressResolver,
  URL: URLResolver,
  Query: {
    plantCatalog,
  },
  Mutation: {
    userSignUp,
  },
};

export default resolvers;
