const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const isEmail = require('isemail');
const { resolvers } = require('./resolver');
const { typeDefs } = require('./schema');
const LaunchAPI = require('./datasources/launch');

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const auth = (req.headers && req.headers.authorization) || '';
      const email = Buffer.from(auth, 'base64').toString('ascii');
      if (!isEmail.validate(email)) return { user: null };

      const users = await store.users.findOrCreate({ where: { email } });
      const user = users && users[0] ? users[0] : null;

      return { user: { ...user.dataValues } };
    },
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
    console.log(`?? Server ready at http://localhost:4000${server.graphqlPath}`));
};

startServer();
