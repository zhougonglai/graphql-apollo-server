const User = require('../models/user');

module.exports = {
  users: async () => await User.find(),
  createUser: async (_, { name }) => {
    const userExist = await User.findOne({ where: { name } });
    if (userExist) {
      throw new Error('User exists already.')
    }
    const user = new User({ name })
    await user.save().catch((err) => {
      throw err;
    });
    return user;
  },
}
