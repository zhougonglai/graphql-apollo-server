const mongoose = require('mongoose');

let cachedDb = null

module.exports = async (uri) => {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    keepAlive: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500,
  });
  cachedDb = client;
  return client;
}
