const cron = require('node-cron');
const previousMonth = require('./removeOldTokens');

module.exports = () => {
  cron.schedule('0 0 * * *', () => {
    console.log(`Cron was started at ${new Date().toISOString()}`);
    previousMonth();
    console.log(`Cron was started at ${new Date().toISOString()}`);
  });
};
