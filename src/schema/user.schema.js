const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    users: [User]
    user: User
    login(userInput: UserInput!): String
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
    name: String!
  }

  type Mutation {
    createUser(userInput: UserInput!): User
  }
`;
