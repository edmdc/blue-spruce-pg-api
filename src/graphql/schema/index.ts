import { gql } from "apollo-server-express";

const typeDefs = gql`
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

  type Token {
    token: String
    expiration: String
  }

  type User {
    _id: String!
    favorites: [Plant]
    name: String
    email: EmailAddress
    password: String
    token: Token
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

  type Mutation {
    userLogIn(email: EmailAddress!, password: String!): User
    userSignUp(name: String!, email: EmailAddress!, password: String!): User
  }
`;

export default typeDefs;
