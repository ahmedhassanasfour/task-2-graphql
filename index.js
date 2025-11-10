const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./src/schema/typeDefs");
const resolvers = require("./src/schema/resolvers");
const { getUserFromToken } = require("./src/auth/auth");

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const auth = req.headers.authorization || "";
      const token = auth.split(" ")[1];
      const user = getUserFromToken(token);
      return { user };
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen("4000", () => {
    console.log("Server running");
  });
}

startServer();
