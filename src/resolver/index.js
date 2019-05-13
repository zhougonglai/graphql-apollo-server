const { paginateResults } = require('../utils');

module.exports = {
  launches: (_, __, { dataSources }) =>
    dataSources.launchAPI.getAllLaunches(),
  launch: (_, { id }, { dataSources }) =>
    dataSources.launchAPI.getLaunchById({ launchId: id }),
};
