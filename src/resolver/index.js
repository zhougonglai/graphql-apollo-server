const { createUser, users } = require('./user');

exports.resolvers = {
  Query: {
    launches: (_, __, { dataSources }) =>
      dataSources.launchAPI.getAllLaunches(),
    launch: (_, { id }, { dataSources }) =>
      dataSources.launchAPI.getLaunchById({ launchId: id }),
    users,
  },
  Mutation: {
    createUser,
  },
}
