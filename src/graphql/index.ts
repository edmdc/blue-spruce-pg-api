import express from "express";
import { ApolloServer } from "apollo-server-express";

import connectMongoDB from "../database";

import typeDefs from "./schema";
import dataSources from "./dataSources";
import resolvers from "./resolvers";
import User from "./models/user";

const App = (): {
  apolloServer: ApolloServer;
  server: express.Application;
  init: () => void;
} => {
  const apolloServer = new ApolloServer({
    typeDefs,
    dataSources,
    resolvers,
    context: async () => ({
      db: await connectMongoDB().catch((err) => console.error(err)),
      models: { User },
    }),
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
