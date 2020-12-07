const { ApolloServer } = require("apollo-server-lambda");

const typeDefs = require("./schema");
const TrefleAPI = require("./trefleAPI/model");
const resolvers = require("./rootResolver");

const server = new ApolloServer({
  typeDefs,
  dataSources: () => ({
    trefleAPI: new TrefleAPI(),
  }),
  resolvers,
  context: async ({ event, context }) => ({
    headers: () => {
      console.log(event.headers);
      return event.headers;
    },
    functionName: context.functionName,
    event,
    context,
  }),
  playground: {
    endpoint: "/dev/graphql",
  },
  introspection: true,
  formatResponse: (response) => {
    return response;
  },
  formatError: (err) => {
    console.log(err);
    return err;
  },
});

exports.apolloHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});
