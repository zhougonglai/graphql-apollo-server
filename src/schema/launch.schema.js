const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query @cacheControl(maxAge: 30){
    launches: [Launch]!
    launchesList(pageSize: Int, after: String): LaunchConnection!
    launch(id: ID!): Launch
  }

  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
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

  enum PatchSize {
    SMALL
    LARGE
  }
`;
