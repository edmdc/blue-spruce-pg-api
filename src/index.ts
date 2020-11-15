import express from "express";
import { ApolloServer } from "apollo-server-express";

import mongodb from "./database";

import typeDefs from "./typeDefs";
import dataSources from "./dataSources";
import resolvers from "./resolvers";

const server = new ApolloServer({
  typeDefs,
  dataSources,
  resolvers,
});

const db = mongodb();
db.once("open", () => console.log("Database connected", db.name));
db.on("error", (err) => console.error("Connection error:", err));
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log("Server running on http://localhost:4000" + server.graphqlPath)
);
