import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";

import connectMongoDB from "../database";

import typeDefs from "./schema";
import dataSources from "./dataSources";
import resolvers from "./resolvers";
import User from "./models/user";

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
  server.use(cors());
  apolloServer.applyMiddleware({ app: server });

  return {
    apolloServer,
    server,
    init() {
      server.listen(process.env.PORT || 4000, () =>
        console.log(`Server listening on http://localhost:4000/graphql`)
      );
    },
  };
};

export default App;
