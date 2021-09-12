module.exports = {
  PORT: process.env.PORT || 5000,
  DB_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb://localhost:27017/test',

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'secret-word',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'secret-word-refresh',

  FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',
  EMAIL_BROADCAST: process.env.EMAIL_BROADCAST || 'fake@gmail.com',
  EMAIL_BROADCAST_PASS: process.env.EMAIL_BROADCAST_PASS || 'fakepass',
};
