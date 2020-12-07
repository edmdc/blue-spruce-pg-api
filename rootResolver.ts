const {
  plantCatalog,
  randomPlantCatalog,
  plantQuiz,
} = require("./trefleAPI/resolvers");
const { EmailAddressResolver, URLResolver } = require("graphql-scalars");

module.exports = {
  EmailAddress: EmailAddressResolver,
  URL: URLResolver,
  Query: {
    plantCatalog,
    randomPlantCatalog,
    plantQuiz,
  },
};
