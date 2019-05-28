const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const isEmail = require('isemail');
const connectDB = require('./utils/connectDB');
const { resolvers } = require('./resolver');
const LaunchAPI = require('./datasources/launch');
const typeDefs = require('./schema/index');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    if (req.headers.authorization) {
      const auth = (req.headers && req.headers.authorization) || '';
      const email = Buffer.from(auth, 'base64').toString('ascii');
      if (!isEmail.validate(email)) {
        return { email: null }
      }
      return { email };
    }
    return { email: null }
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

server.applyMiddleware({ app, path: '/' });

connectDB(process.env.MONGODB_URI)
  .then(() => {
    if (process.env.NODE_ENV !== 'production') {
      app.listen({ port: process.env.PORT || 4000 }, () =>
        console.log(`🚀 Server ready at ${process.env.PORT || 4000} at ${server.graphqlPath}`));
    }
  })

module.exports = app;
