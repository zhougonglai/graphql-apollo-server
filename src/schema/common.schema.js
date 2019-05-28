const { gql } = require('apollo-server-express')

const typeDefs = gql`
  # 新增时间标量类型
  scalar Date
  # 返回数据的接口
  # interface Response {
  #   code: Int
  #   msg: String
  # }
  # 公共的返回数据的Type
  type CommonResponse {
    code: Int
    msg: String
  }

  # 翻页控制
  input OutputCtrl {
    id: Boolean
    limit: Int
    offset: Int
    sort: String
    order: String
  }
`

module.exports = typeDefs
