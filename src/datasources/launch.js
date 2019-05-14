const { RESTDataSource } = require('apollo-datasource-rest');

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.easy-mock.com/mock/5cbd107d08c37e59eb3df85f/api/';
  }

  /**
   *
   * @returns
   * @memberof LaunchAPI
   */
  async getAllLaunches() {
    const response = await this.get('v3/launches');
    return Array.isArray(response)
      ? response.map(launch => this.launchReducer(launch))
      : [];
  }

  /**
   *
   * @param {*} launch
   * @returns
   * @memberof LaunchAPI
   */
  launchReducer(launch) {
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch,
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
      },
    };
  }

  /**
   *
   *
   * @param {*} { launchId }
   * @returns
   * @memberof LaunchAPI
   */
  async getLaunchById({ launchId }) {
    const response = await this.get('v3/launches', { flight_number: launchId });
    return this.launchReducer(response[0]);
  }

  /**
   * @param {*} { launchIds }
   * @returns Promise
   * @memberof LaunchAPI
   */
  getLaunchByIds({ launchIds }) {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId })),
    )
  }
}

module.exports = LaunchAPI;
