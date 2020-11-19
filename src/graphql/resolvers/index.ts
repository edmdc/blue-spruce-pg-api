import { plantCatalog, randomPlantCatalog } from "./plants";
import { userSignUp, userLogIn } from "./user";
import { EmailAddressResolver, URLResolver } from "graphql-scalars";

const resolvers = {
  EmailAddress: EmailAddressResolver,
  URL: URLResolver,
  Query: {
    plantCatalog,
    randomPlantCatalog,
  },
  Mutation: {
    userSignUp,
    userLogIn,
  },
};

export default resolvers;
