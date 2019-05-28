const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query @cacheControl(maxAge: 30){
    launches(launchInput: LaunchInput, outputCtrl: OutputCtrl): [Launch]!
    launch(id: ID!): Launch
  }

  type Launch {
    id: ID!
    cursor: Int
    site: String
    mission: Mission
    rocket: Rocket
  }

  input LaunchInput {
    flight_id: String
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
