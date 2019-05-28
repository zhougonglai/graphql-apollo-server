const { RESTDataSource } = require('apollo-datasource-rest');
const DataLoader = require('dataloader')

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v3/';
    this.launchLoader = new DataLoader(async launchId => await this.get('launches', { flight_number: launchId }))
  }

  /**
   *
   * @returns
   * @memberof LaunchAPI
   */
  async getAllLaunches() {
    const response = await this.get('launches');
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
    const response = await this.launchLoader.load(launchId);
    return this.launchReducer(response);
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
