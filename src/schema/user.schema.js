const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query @cacheControl(maxAge: 30){
    users: [User]
    user: User
    login(userInput: UserInput!): String
  }

  type Subscription {
    """
    部署版没有订阅器
    """
    userObservable: User
  }

  """
  用户
  """
  type User {
    id: ID!
    name: String!
    email: String!
  }

  input UserInput {
    email: String!
  }

  type Mutation {
    createUser(userInput: UserInput!): User
    updateUser(name: String!): User
  }
`;
