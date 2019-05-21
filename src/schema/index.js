const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  type Query {
    launches: [Launch]!
    launchesList(pageSize: Int, after: String): LaunchConnection!
    launch(id: ID!): Launch
    users: [User]
  }

  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  type User {
    id: ID!
    name: String!
  }

  type Launch {
    id: ID!
    cursor: Int
    site: String
    mission: Mission
    rocket: Rocket
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type Mission{
    name: String
    missionPatch(size: PatchSize): String
  }

  type Mutation {
    createUser(name: String!): User
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;
