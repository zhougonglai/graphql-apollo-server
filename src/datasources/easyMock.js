const { RESTDataSource } = require('apollo-datasource-rest');

class MockAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.easy-mock.com/mock/5cbd107d08c37e59eb3df85f/api/';
  }
}

module.exports = MockAPI;
