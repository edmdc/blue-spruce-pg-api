import {
  plantCatalog,
  randomPlantCatalog,
  plantQuiz,
} from "./trefleAPI/resolvers";
import { EmailAddressResolver, URLResolver } from "graphql-scalars";

const resolvers = {
  EmailAddress: EmailAddressResolver,
  URL: URLResolver,
  Query: {
    plantCatalog,
    randomPlantCatalog,
    plantQuiz,
  },
};

export default resolvers;
