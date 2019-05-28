const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language');
const {
  createUser, users, user, login,
} = require('./user');
const { paginateResults } = require('../utils');

exports.resolvers = {
  Query: {
    launches: (_, { launchInput, outputCtrl }, { dataSources }) =>
      dataSources.launchAPI.getAllLaunches({ ...launchInput, ...outputCtrl }),
    launch: (_, { id }, { dataSources }) =>
      dataSources.launchAPI.getLaunchById({ launchId: id }),
    users,
    login,
    user,
  },
  Mutation: {
    createUser,
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
}
