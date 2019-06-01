const { AuthenticationError, UserInputError, PubSub } = require('apollo-server-express');
const User = require('../models/user');

const UPDATE_USER = 'UPDATE_USER';
const pubsub = new PubSub();

module.exports = {
  Subscription: {
    userObservable: {
      subscribe: () => pubsub.asyncIterator(UPDATE_USER),
    },
  },
  Query: {
    users: async () => await User.find(),
    login: async (_, { userInput: { email } }) => {
      const user = await User.findOne({ email })
      if (!user) {
        throw new UserInputError('Form Arguments invalid', {
          invalidArgs: ['email'],
        });
      }
      return Buffer.from(email).toString('base64');
    },
    user: async (_, __, { email }) => {
      if (!email) {
        throw new AuthenticationError('must authenticate');
      }
      const user = await User.findOne({ email })
      pubsub.publish(UPDATE_USER, { userObservable: user });
      return user;
    },
  },
  Mutation: {
    createUser: async (_, { userInput: { email, name } }) => {
      const userExist = await User.findOne({ where: { name } });
      if (userExist) {
        throw new Error('User exists already.')
      }
      const user = new User({ email, name })
      await user.save().catch((err) => {
        throw err;
      });
      return user;
    },
    updateUser: async (_, { name }, { email }) => {
      if (!email) {
        throw new AuthenticationError('must authenticate');
      }
      if (!name) {
        throw new UserInputError('Form Arguments invalid', {
          invalidArgs: ['name'],
        });
      }
      const user = await User.findOneAndUpdate({ email }, { name })
      user.name = name;
      pubsub.publish(UPDATE_USER, { userObservable: user });
      return user;
    },
  },
};
