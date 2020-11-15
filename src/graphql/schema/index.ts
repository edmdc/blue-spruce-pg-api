import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Plant {
    id: Int!
    commonName: String
    scientificName: String
    imageUrl: String
    familyCommonName: String
    familyScientificName: String
  }

  type Query {
    plantCatalog(page: Int, zone: String): [Plant]
  }
`;

export default typeDefs;
