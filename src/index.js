const { ApolloServer, PubSub } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolver');
const LaunchAPI = require('./datasources/launch');

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
  }),
  context: ({ req, res }) => ({ req, res, pubsub }),
})

server.listen()
  .then(({ url }) => console.log(`server started at ${url}`))
