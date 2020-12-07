const { gql } = require("apollo-server-lambda");

module.exports = gql`
  scalar EmailAddress
  scalar URL

  type Plant {
    id: Int!
    commonName: String
    scientificName: String
    imageUrl: URL
    familyCommonName: String
    familyScientificName: String
  }

  type AnswerChoice {
    answerID: Int
    choices: [Plant]
  }

  type Query {
    plantCatalog(page: Int, zone: String): [Plant]
    randomPlantCatalog: [Plant]
    plantQuiz: [AnswerChoice]
  }
`;
