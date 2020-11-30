import { ApolloServer } from "apollo-server";

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
    cors: {
      origin: "*",
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });

  return {
    apolloServer,
    init() {
      apolloServer
        .listen({ port: PORT })
        .then(({ url }) => console.log(`Navigate to ${url} to view graph`));
    },
  };
};

export default App;
