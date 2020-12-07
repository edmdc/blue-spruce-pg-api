import { gql } from "apollo-server-lambda";

export default gql`
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
