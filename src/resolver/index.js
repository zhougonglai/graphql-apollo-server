const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language');
const {
  Query: UserQuery,
  Mutation: UserMutation,
  Subscription: UserSubscription,
} = require('./user');

exports.resolvers = {
  Subscription: {
    ...UserSubscription,
  },
  Query: {
    launches: (_, { launchInput, outputCtrl }, { dataSources }) =>
      dataSources.launchAPI.getAllLaunches({ ...launchInput, ...outputCtrl }),
    launch: (_, { id }, { dataSources }) =>
      dataSources.launchAPI.getLaunchById({ launchId: id }),
    ...UserQuery,
  },
  Mutation: {
    ...UserMutation,
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
