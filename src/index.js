const {
  ApolloServer,
} = require('apollo-server-express');
const express = require('express');
const http = require('http');
const isEmail = require('isemail');
const connectDB = require('./utils/connectDB');
const { resolvers } = require('./resolver');
const LaunchAPI = require('./datasources/launch');
const typeDefs = require('./schema/index');

const app = express();

const author = ({ authorization }) => {
  const email = Buffer.from(authorization, 'base64').toString('ascii');
  if (!isEmail.validate(email)) {
    return {
      email: null,
    };
  }
  return {
    email,
  };
}

const server = new ApolloServer({
  subscriptions: {
    path: '/',
    keepAlive: 3,
  },
  typeDefs,
  resolvers,
  context: async ({ req, res, connection }) => {
    if (connection) {
      return connection.context;
    }
    if (req.headers.authorization) {
      return { ...author(req.headers) };
    }
    return {
      email: null,
    }
  },
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
  }),
  formatError: (err) => {
    return err;
  },
  tracing: true,
  introspection: true,
  playground: true,
})

server.applyMiddleware({
  app,
  path: '/',
  cors: {
    credentials: true,
  },
});

connectDB(process.env.MONGODB_URI)
  .then(() => {
    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);
    httpServer.listen({ port: process.env.PORT || 4000, path: '/' }, () => {
      console.log(`🚀 Server ready at ${server.graphqlPath}`);
      console.log(`🚀 Subscriptions ready at ${server.subscriptionsPath}`);
    });
  })
