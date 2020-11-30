import express from "express";
import { ApolloServer } from "apollo-server-express";

import connectMongoDB from "../database";

import typeDefs from "./schema";
import dataSources from "./dataSources";
import resolvers from "./resolvers";
import User from "./models/user";
import { PORT } from "../env";

const authMiddleware = (reqHeader: any) => {
  return reqHeader;
};

const App = (): {
  apolloServer: ApolloServer;
  server: express.Application;
  init: () => void;
} => {
  const apolloServer = new ApolloServer({
    typeDefs,
    dataSources,
    resolvers,
    context: async ({ req }) => ({
      db: await connectMongoDB().catch((err) => console.error(err)),
      models: { User },
      userLoggedIn: authMiddleware(req.headers.authorization),
    }),
  });

  const server = express();
  apolloServer.applyMiddleware({ app: server, cors: true });

  return {
    apolloServer,
    server,
    init() {
      server.listen(PORT, () =>
        console.log(`Server listening on http://localhost:${PORT}/graphql`)
      );
    },
  };
};

export default App;
