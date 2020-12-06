import App from "./graphql";

exports.graphqlHandler = App().createHandler({
  cors: {
    origin: "*",
  },
});
