const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query @cacheControl(maxAge: 30){
    launches(launchInput: LaunchInput, outputCtrl: OutputCtrl): [Launch]!
    launch(id: ID!): Launch
  }

  type Launch {
    """
    飞行编号
    """
    id: ID!
    """
    日期<php>
    """
    cursor: Int
    """
    网站
    """
    site: String
    """
    描述
    """
    details: String
    """
    发生成功?
    """
    success: Boolean
    """
    任务
    """
    mission: Mission
    """
    火箭
    """
    rocket: Rocket
  }

  input LaunchInput {
    flight_id: String
  }

  type Rocket {
    """
    火箭编号
    """
    id: ID!
    """
    名字
    """
    name: String
    """
    类型
    """
    type: String
  }

  type Mission{
    """
    任务名
    """
    name: String
    """
    片段
    """
    missionPatchSmall: String
    missionPatchLarge: String
  }
`;
