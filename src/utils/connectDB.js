const mongoose = require('mongoose');

let cachedDb = null

module.exports = async (uri) => {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await mongoose.connect(uri, { useNewUrlParser: true, keepAlive: true });
  cachedDb = client;
  return client;
}
