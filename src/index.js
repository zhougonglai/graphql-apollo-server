const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const { resolvers } = require('./resolver');
const { typeDefs } = require('./schema');
const LaunchAPI = require('./datasources/launch');

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res, connection }) => ({ req, res, connection }),
    dataSources: () => ({
      launchAPI: new LaunchAPI(),
    }),
  })

  server.applyMiddleware({ app });

  await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-y04ex.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    {
      useNewUrlParser: true,
      keepAlive: true,
    })

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
};

startServer();
