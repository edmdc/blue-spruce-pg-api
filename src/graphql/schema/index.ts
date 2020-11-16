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
    id: ID!
    favorites: [Plant]
    name: String
    email: EmailAddress
    password: String
  }

  type Query {
    plantCatalog(page: Int, zone: String): [Plant]
  }
`;

export default typeDefs;
