import { plantCatalog, randomPlantCatalog, plantQuiz } from "./plants";
import { userSignUp, userLogIn } from "./user";
import { EmailAddressResolver, URLResolver } from "graphql-scalars";

const resolvers = {
  EmailAddress: EmailAddressResolver,
  URL: URLResolver,
  Query: {
    plantCatalog,
    randomPlantCatalog,
    plantQuiz,
  },
  Mutation: {
    userSignUp,
    userLogIn,
  },
};

export default resolvers;
