import { ApolloServer } from "apollo-server-lambda";

import typeDefs from "./schema";
import dataSources from "./dataSources";
import resolvers from "./resolvers";

const App = (): ApolloServer =>
  new ApolloServer({
    typeDefs,
    dataSources,
    resolvers,
    context: async ({ event, context }) => ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
    }),
    playground: {
      endpoint: "/dev/graphql",
    },
    introspection: true,
  });
export default App;
