const { AuthenticationError, UserInputError } = require('apollo-server-express');
const User = require('../models/user');

module.exports = {
  users: async () => await User.find(),
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
  login: async (_, { userInput: { email, name } }) => {
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
    return user;
  },
}
