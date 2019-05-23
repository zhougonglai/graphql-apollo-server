const { mergeTypes } = require('merge-graphql-schemas')
const CommonSchema = require('./common.schema');
const LaunchSchema = require('./launch.schema');
const UserSchema = require('./user.schema');

const schemas = [
  CommonSchema,
  LaunchSchema,
  UserSchema,
]

module.exports = mergeTypes(schemas, { all: true })
