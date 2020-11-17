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

  type User {
    _id: String!
    favorites: [Plant]
    name: String
    email: EmailAddress
    password: String
  }

  type Query {
    plantCatalog(page: Int, zone: String): [Plant]
    randomPlantCatalog: [Plant]
    userLogIn(email: String!, password: String!): User
  }

  type Mutation {
    userSignUp(name: String!, email: EmailAddress!, password: String!): User
  }
`;

export default typeDefs;
