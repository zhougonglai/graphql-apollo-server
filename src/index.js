const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const isEmail = require('isemail');
const connectDB = require('./utils/connectDB');
const { resolvers } = require('./resolver');
const typeDefs = require('./schema');
const LaunchAPI = require('./datasources/launch');

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
  introspection: true,
  playground: true,
})

server.applyMiddleware({ app, path: '/' });

connectDB(process.env.MONGODB_URI)
  .then(() => {
    app.listen({ port: process.env.PORT || 4000 }, () =>
      console.log(`?? Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`));
  });

module.exports = app;
