import express from "express";
import { ApolloServer } from "apollo-server-express";

import mongodb from "../database";

import typeDefs from "./schema";
import dataSources from "./dataSources";
import resolvers from "./resolvers";
import { Connection } from "mongoose";

let dbClient: Connection;

const App = (): {
  apolloServer: ApolloServer;
  server: express.Application;
  init: () => void;
} => {
  const apolloServer = new ApolloServer({
    typeDefs,
    dataSources,
    resolvers,
    context: async () => {
      if (!dbClient) {
        try {
          dbClient = await mongodb();
        } catch (err) {
          console.error("Connection failed:", err);
        } finally {
          dbClient.close();
        }
      }
      return { dbClient };
    },
  });

  const server = express();

  return {
    apolloServer,
    server,
    init() {
      apolloServer.applyMiddleware({ app: server });
      server.listen({ port: 4000 }, () =>
        console.log(
          "Server running on http://localhost:4000" + apolloServer.graphqlPath
        )
      );
    },
  };
};

export default App;
